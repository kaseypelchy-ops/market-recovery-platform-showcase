# Engineering Decisions

## Canonical identity before analytics

**Problem:** Raw source names are not guaranteed to describe identical geographic units.

**Decision:** Resolve source records into canonical markets before calculating current market analytics.

**Why it matters:** A perfectly written scoring formula still produces misleading results if the underlying identity is wrong.

---

## Scoring and eligibility are separate

**Problem:** A high-distress market may already have recovery work in progress or may not have enough valid history for a new decision.

**Decision:** Keep recovery severity independent from operational eligibility.

**Why it matters:** The system can continue measuring a market without incorrectly recommending duplicate work.

---

## Subscriber reconciliation is diagnostic

**Problem:** Two subscriber sources can differ for legitimate source-definition reasons.

**Decision:** Surface reconciliation variance as a diagnostic signal rather than making it an automatic recommendation blocker.

**Why it matters:** Data-quality context stays visible without turning a useful warning into an accidental business rule.

---

## Preserve historical baselines

**Problem:** Mapping corrections can legitimately change the measurement universe after a recovery project begins.

**Decision:** Never rewrite the original frozen baseline. Create a rebaseline when a justified correction is needed.

**Why it matters:** Operators retain both historical truth and a valid current comparison anchor.

---

## Human review for ambiguous mapping

**Problem:** Fuzzy/non-exact mapping can silently contaminate market metrics.

**Decision:** Auto-resolve exact/safe cases and retain ambiguous cases for explicit review.

**Why it matters:** Data integrity is more valuable than maximizing automatic mapping coverage.

---

## Revalidate critical writes server-side

**Problem:** A recommendation visible in the browser can become stale before an operator starts a project.

**Decision:** Controlled project-start logic revalidates recommendation state at write time.

**Why it matters:** The database transition is based on current state, not stale UI state.

---

## Optimize the analytical read path instead of raising timeouts

**Problem:** Cold Dashboard / Market Investigation loads produced PostgreSQL statement timeouts.

**Decision:** Remove duplicate nested-view evaluation, bound rolling-event reads, add targeted indexes, and centralize shared data loaders.

**Why it matters:** Increasing a timeout would hide the architectural problem rather than improving the read path.

---

## Refactor after stabilization

**Problem:** Performance fixes made the server route files correct but large.

**Decision:** Perform a behavior-preserving refactor into a shared `lib/market-recovery/` layer only after functionality and performance were validated.

**Why it matters:** The project improved maintainability without mixing refactor risk with unresolved functional changes.
