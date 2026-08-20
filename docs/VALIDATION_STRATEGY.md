# Validation Strategy

## Validation layers

The system benefits from validation at multiple boundaries because a decision-support application can fail while still rendering plausible numbers.

### 1. Source contract validation

Checks that an uploaded report is structurally the expected source:

- logical field presence
- workbook/sheet signature
- parseable date and numeric fields
- duplicate-header detection
- unsupported-source rejection

### 2. Normalization tests

Synthetic fixtures verify:

- date normalization
- classification
- null behavior
- stable dedupe identity
- duplicate-upload handling
- row rejection reasons

### 3. Identity tests

Mapping fixtures cover:

- exact match
- approved alias
- ambiguous match
- unmapped source
- historical/inactive entity

### 4. Analytical invariants

Useful invariants include:

```text
disconnects >= recoverable_disconnects
completeness between 0 and 1
eligible => score is usable
historical lifecycle => not eligible for new work
```

The exact production constraints are omitted.

### 5. Recommendation determinism

Given the same canonical input state, ranking should be stable.

Tests should exercise tie-break conditions explicitly.

### 6. Transactional workflow tests

Starting a project should be all-or-nothing:

```text
revalidate candidate
+ create project
+ create baseline snapshot
= one transaction
```

Failure at any step should prevent partial workflow state.

### 7. Application build checks

Representative checks:

```bash
npm run lint
npm run build
```

The public static showcase itself does not require Node, but these checks describe the underlying application discipline.

### 8. Browser regression

Important flows are tested by navigation, not only direct route load:

```text
Dashboard
  → Markets
  → Market Investigation
  → Recovery Projects
  → Dashboard
```

This catches issues that can appear only during client/server navigation.

## Data-quality observability

A decision system should expose quality state instead of hiding it.

Useful operator-visible states include:

- full evidence
- partial evidence
- historical-only
- mapping review required
- source disagreement warning

A quality warning should not accidentally become a business rule unless explicitly designed that way.
