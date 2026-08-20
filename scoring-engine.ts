import type { ScoreResult, Signal } from "./domain-model";

export function calculateScore(signals: Signal[]): ScoreResult {
  const configuredWeight = signals.reduce(
    (sum, signal) => sum + signal.weight,
    0,
  );

  const available = signals.filter(
    (signal): signal is Signal & { value: number } =>
      signal.value !== null,
  );

  const availableWeight = available.reduce(
    (sum, signal) => sum + signal.weight,
    0,
  );

  const weightedTotal = available.reduce(
    (sum, signal) => sum + signal.value * signal.weight,
    0,
  );

  return {
    score:
      availableWeight === 0
        ? null
        : weightedTotal / availableWeight,
    completeness:
      configuredWeight === 0
        ? 0
        : availableWeight / configuredWeight,
    availableWeight,
    configuredWeight,
  };
}
