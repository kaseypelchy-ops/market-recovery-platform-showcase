# Engineering Decisions

This document records representative architectural decisions using public abstractions. Production identifiers and exact private rules are intentionally omitted.

## ADR-001 — Canonical identity before analytics

**Context:** Source systems can use different names and geographic grains.

**Decision:** Resolve source records into a canonical market identity before current-market aggregation.

**Consequences:**
- one stable analytical key
- explicit mapping state
- easier cross-source comparison
- mapping quality becomes observable

**Rejected alternative:** group directly by raw source name.

---

## ADR-002 — Severity and eligibility remain separate

**Context:** A highly distressed market may already be under active recovery work or may not have enough valid evidence for a new action.

**Decision:** The score models severity. A separate policy layer models whether a new action is allowed.

**Consequences:**
- active work does not change the analytical score
- project state can evolve independently from the score formula
- recommendation exclusions are explainable

**Rejected alternative:** bake project/lifecycle rules into the score.

---

## ADR-003 — Missing evidence is not healthy evidence

**Context:** Treating unavailable signals as zero severity biases incomplete markets toward "healthy."

**Decision:** Normalize weighted score over available evidence and report completeness separately.

**Consequences:**
- partial-history markets are explicit
- severity and confidence/coverage are distinct
- new data can change both score and completeness

**Rejected alternative:** coalesce missing signals to zero.

---

## ADR-004 — Ambiguous identity requires review

**Context:** Fuzzy matching can increase mapping coverage while contaminating analytics.

**Decision:** Auto-resolve only sufficiently safe cases and retain ambiguous mappings for explicit review.

**Consequences:**
- lower automatic coverage
- stronger data integrity
- review queue becomes a first-class workflow

**Rejected alternative:** always select the best fuzzy match.

---

## ADR-005 — Historical baselines are immutable

**Context:** Identity or data corrections can change the analytical universe after a recovery project starts.

**Decision:** Preserve the original baseline and create a new rebaseline when a justified correction changes the current comparison anchor.

**Consequences:**
- original decision context remains auditable
- current comparisons can still be corrected
- snapshot lineage must be explicit

**Rejected alternative:** overwrite the original baseline.

---

## ADR-006 — Critical workflow writes are revalidated

**Context:** Browser-visible recommendation state can become stale before a user acts.

**Decision:** Re-read current candidate/project state at the write boundary and perform project creation plus baseline capture transactionally.

**Consequences:**
- stale UI cannot bypass current policy
- partial project creation is avoided
- write path has stronger database coupling

**Rejected alternative:** trust the client and insert directly.

---

## ADR-007 — One canonical analytical read per page request

**Context:** Overlapping analytical views can cause repeated database work.

**Decision:** Centralize server data loading and derive presentation classification/ranking from one canonical analytical result plus lightweight operational state.

**Consequences:**
- fewer redundant reads
- consistent behavior across pages
- route components become smaller
- domain code becomes more testable

**Rejected alternative:** let each UI component independently query its preferred derived view.

---

## ADR-008 — Materialization is a scale step, not a first reaction

**Context:** A precomputed score table can make reads fast but introduces freshness and refresh complexity.

**Decision:** First remove duplicate reads and bound base scans. Introduce refreshed/materialized analytics only when query optimization no longer meets latency goals.

**Consequences:**
- simpler system while direct calculation is affordable
- clear next scaling path
- materialization cost is taken only when justified

**Rejected alternative:** precompute every analytical layer immediately.
