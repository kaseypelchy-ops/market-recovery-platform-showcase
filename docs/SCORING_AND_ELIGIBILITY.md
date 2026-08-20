# Scoring and Eligibility

## Why these are separate systems

Recovery severity answers:

> How strongly does the available evidence indicate market distress?

Eligibility answers:

> Is a new action allowed for this market right now?

They are related but not interchangeable.

## Coverage-aware score

The public reference model uses weighted normalized signals:

\[
score = \frac{\sum(value_i \times weight_i)}{\sum(weight_i\;for\;available\;signals)}
\]

The exact private signal weights and production cutoffs are intentionally omitted.

### Missing evidence

A missing signal should not automatically contribute a zero severity value.

Example:

```ts
const usable = signals.filter((signal) => signal.value !== null);

const availableWeight = sum(usable.map((signal) => signal.weight));
const weightedTotal = sum(
  usable.map((signal) => signal.value! * signal.weight),
);

const score =
  availableWeight === 0
    ? null
    : weightedTotal / availableWeight;
```

The model should also return completeness:

```ts
const completeness =
  configuredWeight === 0
    ? 0
    : availableWeight / configuredWeight;
```

This lets the UI distinguish:

- low score with strong evidence
- high score with strong evidence
- high/low score with weak evidence
- no usable score

## Signal families

The public model groups signals broadly rather than reproducing private production components:

- subscriber trajectory
- recent acquisition balance
- churn composition
- service/product friction
- recoverability
- absolute impact
- data completeness

These families are enough to explain the design without revealing exact production logic.

## Eligibility policy

Eligibility consumes analytical state plus operational state:

```ts
type EligibilityInput = {
  scoreUsable: boolean;
  lifecycle: "active" | "historical";
  conflictingProject: boolean;
  reviewHold: boolean;
};

const eligible =
  input.scoreUsable &&
  input.lifecycle === "active" &&
  !input.conflictingProject &&
  !input.reviewHold;
```

The policy is intentionally explicit so that adding a new rule does not require changing the score formula.

## Deterministic ranking

Ranking should be stable and explainable.

A public ranking shape might be:

1. severity descending
2. long-horizon trend worsening first
3. recent acquisition deficit worsening first
4. stable display key

The public repository does not reproduce exact production sorting keys or thresholds.

## Recommended focus

Recommendation focus is derived after score and eligibility.

The result should explain *why* the market surfaced:

```ts
type Recommendation = {
  marketId: string;
  rank: number;
  focus: "acquisition" | "retention" | "service" | "product" | "monitor";
  reasons: string[];
};
```

The reasons array is important. A recommendation engine that only returns a rank is much harder to audit.

## Explainability requirement

For every ranked market, an operator should be able to inspect:

- the score
- available evidence
- missing evidence
- eligibility state
- ranking context
- dominant signals
- historical project state

That information should come from the same canonical analytical path used for ranking, not a second UI-only formula.
