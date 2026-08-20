# Data Pipeline

## Design goals

The ingestion pipeline is designed around five properties:

1. **repeatability** — the same source can be processed again safely
2. **traceability** — normalized rows can be related back to source evidence
3. **validation** — malformed or wrong report types fail before persistence
4. **separation** — source-specific parsing does not leak into analytics
5. **identity safety** — source geography is not assumed to equal canonical geography

## Ingestion contract

Each source adapter produces normalized records through a common result shape:

```ts
type ParseResult<T> = {
  accepted: T[];
  rejected: Array<{
    row: number;
    reason: string;
  }>;
  warnings: string[];
  sourceFingerprint: string;
};
```

The real system contains source-specific validation rules. The public example intentionally omits exact production column signatures.

## Structural validation

Validation occurs before business classification.

Typical checks:

- expected file type
- required sheet/table presence
- required logical fields
- parseable dates
- numeric ranges
- empty-row handling
- duplicated header detection
- source-shape mismatch

A report should fail as the *wrong source type* rather than partially persisting misleading rows.

## Normalization

Source data is converted into typed domain evidence.

```ts
type NormalizedEvent = {
  sourceEventKey: string;
  occurredAt: string;
  sourceEntityKey: string;
  eventKind: "acquisition" | "churn" | "other";
  classification: string;
  metadata: Record<string, unknown>;
};
```

Normalization responsibilities include:

- whitespace/case normalization
- date parsing
- numeric coercion
- null handling
- controlled categorical mapping
- source-specific classification
- generation of stable dedupe identity

## Idempotency

Historical uploads must be safe to repeat.

A stable source-event key can be conceptualized as:

```text
hash(
  source system
  + source record identity
  + effective date
  + event type
)
```

The exact production key is intentionally not reproduced here.

Persistence should enforce uniqueness at the database boundary where practical.

## Canonical identity resolution

Source records may identify geography differently. The mapping pipeline therefore uses explicit state:

```ts
type MappingResolution =
  | { status: "exact"; canonicalId: string }
  | { status: "approved"; canonicalId: string }
  | { status: "ambiguous"; candidates: string[] }
  | { status: "unmapped" };
```

This is preferable to a fuzzy join that always returns a match.

## Analytical handoff

Only normalized and identity-resolved records enter canonical market analytics.

```text
raw source
  ↓
validated source
  ↓
normalized evidence
  ↓
canonical identity
  ↓
market analytics
```

The boundary prevents parser behavior from becoming hidden scoring logic.

## Failure handling

A robust pipeline distinguishes:

- **file rejection** — source does not match expected contract
- **row rejection** — isolated malformed record
- **warning** — usable data with a quality concern
- **mapping hold** — record is valid but cannot yet be assigned safely
- **persistence conflict** — duplicate/idempotency condition

These are different operational states and should not be collapsed into one generic error.
