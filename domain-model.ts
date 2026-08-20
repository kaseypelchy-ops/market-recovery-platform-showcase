export type Lifecycle = "active" | "historical";

export type NormalizedEvent = {
  sourceEventKey: string;
  occurredAt: string;
  sourceEntityKey: string;
  eventKind: "acquisition" | "churn" | "other";
  classification: string;
};

export type MarketIdentity = {
  id: string;
  displayName: string;
  lifecycle: Lifecycle;
};

export type Signal = {
  key: string;
  value: number | null;
  weight: number;
};

export type ScoreResult = {
  score: number | null;
  completeness: number;
  availableWeight: number;
  configuredWeight: number;
};

export type ProjectState = {
  hasConflictingWork: boolean;
  isInReviewHold: boolean;
};

export type Recommendation = {
  marketId: string;
  rank: number;
  focus: "acquisition" | "retention" | "service" | "product" | "monitor";
  reasons: string[];
};
