# Architecture Case Study

## System goal

The system exists to answer a business question that appears simple but requires several controlled analytical steps:

> Which market should be investigated or worked next, why, and how will we know whether the intervention improved the market?

The design intentionally separates evidence, identity, scoring, action eligibility, operational workflow, and historical measurement.

## 1. Source ingestion

The application ingests three report families:

- Sales CSV
- Disconnect CSV
- Weekly Subscriber Report (XLSX)

The weekly workbook contributes two distinct subscriber concepts: franchise subscriber snapshots and market-level historical subscriber observations. They are retained separately rather than assumed to reconcile exactly.

## 2. Normalization

Raw reports are converted into durable normalized records such as:

- `sales_events`
- `disconnect_events`
- `franchise_subscriber_snapshots`
- `internet_market_subscriber_snapshots`

The ingestion layer performs structural validation, source-signature validation, parsing, normalization, classification, and stable deduplication.

## 3. Canonical market identity

Operational systems can represent geography differently. The system therefore maintains a canonical market identity model instead of directly grouping every source by a raw name string.

Relevant concepts include:

- canonical markets
- franchise mappings
- source-market mappings
- aliases
- mapping proposals
- explicit human resolutions for ambiguous non-exact matches
- active / no-longer-served lifecycle state

## 4. Derived analytics

Normalized activity and subscriber history are transformed into reusable analytical views. These derive:

- 7 / 30 / 90-day sales
- 7 / 30 / 90-day disconnects
- net acquisition
- churn-category totals
- recoverable churn opportunity
- subscriber trend windows
- trend direction and acceleration
- penetration context
- subscriber-source reconciliation diagnostics

## 5. Canonical recovery score

`canonical_market_recovery_scores` is the single current recovery-score universe.

The model uses nine families of signal:

1. long-term decline
2. short-term decline
3. trend acceleration
4. acquisition deficit
5. competition churn
6. service churn
7. price/product churn
8. absolute subscriber loss
9. recoverable opportunity

The public showcase intentionally does not reproduce confidential production weights or exact cutoffs.

### Missing-data principle

Missing history is not automatically treated as healthy. Score coverage is measured separately from score severity, and limited-history exceptions are narrow and lifecycle-aware.

## 6. Recommendation eligibility

Score severity and action eligibility are different concepts.

A market can be highly distressed but still be excluded from a new recommendation because of:

- insufficient score coverage
- active recovery work
- post-completion cooldown
- no-longer-served lifecycle state
- other explicit project constraints

Eligible candidates are ranked deterministically from the canonical score universe.

## 7. Market Investigation

The Market Investigation workspace brings together the evidence needed to understand a candidate without creating a parallel scoring system.

It presents:

- subscriber trajectory
- multi-window trend comparisons
- sales / disconnect / net acquisition windows
- churn-driver breakdown
- recovery-score components
- data quality
- action eligibility
- recommendation context
- recovery-project history
- frozen snapshots
- lifecycle context

## 8. Recovery Projects and historical measurement

Operational recovery work is persisted separately from scoring.

A project can move through operational states such as selected, in progress, monitoring, completed, or paused.

Frozen measurement snapshots preserve historical state. The original baseline is not overwritten. If a legitimate mapping/data correction changes the measurement universe, a rebaseline can become the current comparison anchor while preserving the original historical snapshot.

## 9. Performance architecture

A cold-load timeout exposed two issues:

1. multiple nested derived views could recalculate the same recovery universe during a single request;
2. historical event reads were broader than the rolling analytical windows required.

The read path was changed to favor one canonical score read plus lightweight project/cooldown state, while application code derives presentation classification and ranking where appropriate. Rolling acquisition/disconnect reads were bounded to the relevant analysis window and supported by targeted indexes.

## 10. Shared Market Recovery layer

After the performance fix, shared domain and data logic was extracted from route files into:

```text
lib/market-recovery/
├── types.ts
├── numeric.ts
├── classification.ts
├── recommendation.ts
├── dashboard-data.ts
└── market-detail-data.ts
```

This keeps route files focused on orchestration/presentation and reduces the risk that Dashboard and Market Investigation evolve separate implementations of the same recovery rules.
