# Performance Engineering

## Incident

An analytical page could be logically correct and still perform poorly on a cold request.

The problematic pattern was equivalent to:

```text
request
  ├─ query score view
  ├─ query classification view
  ├─ query recommendation view
  └─ query next-candidate view
```

Each higher-level view depended on overlapping lower-level analytical work. PostgreSQL could therefore repeat expensive evaluation during a single page render.

## Diagnosis

The core issue was **read-path duplication**, not simply a low timeout.

A useful diagnostic sequence is:

1. identify every query executed by the route
2. expand dependent views/CTEs conceptually
3. find overlapping scans and aggregations
4. inspect event-window predicates
5. inspect indexes that support the actual filter/join shape
6. distinguish cold-cache behavior from steady-state behavior

## Refactored read path

```text
request
  ↓
shared server loader
  ├─ one canonical analytical read
  ├─ lightweight operational-state read
  └─ lightweight lifecycle/quality read
  ↓
domain-layer classification
  ↓
domain-layer ranking
  ↓
render
```

Benefits:

- one expensive analytical universe per request
- fewer redundant database round trips
- consistent dashboard/investigation behavior
- simpler performance reasoning
- easier future caching/materialization

## Bound the data horizon

Rolling metrics do not require unlimited historical event scans.

Public pseudocode:

```sql
SELECT ...
FROM acquisition_events
WHERE event_date >= CURRENT_DATE - :analysis_window;
```

The production analysis horizon is deliberately abstracted.

The important principle is to push the time predicate as close to the base event scan as possible.

## Index strategy

Indexes should follow the real access pattern.

Representative pattern:

```sql
CREATE INDEX CONCURRENTLY IF NOT EXISTS
  acquisition_events_entity_date_idx
ON acquisition_events (canonical_entity_id, event_date DESC);
```

A separate date-leading index may also be useful when queries primarily filter by time before entity.

The exact production indexes are not published here.

## Why not just increase the statement timeout?

A larger timeout can turn a visible failure into a slower success while preserving:

- duplicated work
- poor scaling
- unnecessary CPU
- unnecessary I/O
- inconsistent cold-request latency

Timeout increases can be appropriate in some systems, but they should follow query/read-path analysis rather than replace it.

## Next scale step

If the canonical analytical stack becomes expensive even after query optimization:

```text
normalized evidence
  ↓
canonical calculations
  ↓
refreshed/materialized score layer
  ↓
fast application reads
```

At that point, the engineering problem changes from "optimize every page request" to "manage freshness, refresh cost, and invalidation."

## Validation after optimization

Performance work should be checked against both correctness and navigation behavior:

- compare returned market set before/after
- compare score/recommendation outputs on synthetic fixtures
- run cold and warm navigation
- confirm no manual-refresh requirement
- run build/type checks
- inspect database errors, not only HTTP status

An HTTP `200` from a framework route does not prove the underlying analytical query succeeded if the framework rendered an error boundary.
