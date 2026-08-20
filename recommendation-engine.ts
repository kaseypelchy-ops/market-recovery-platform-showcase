import type {
  Lifecycle,
  ProjectState,
  Recommendation,
  ScoreResult,
} from "./domain-model";

type Candidate = {
  marketId: string;
  displayName: string;
  lifecycle: Lifecycle;
  score: ScoreResult;
  longTrend: number | null;
  recentNetAcquisition: number | null;
  projectState: ProjectState;
  focus: Recommendation["focus"];
};

type Policy = {
  minimumCompleteness: number;
  minimumActionScore: number;
};

export function isEligible(
  candidate: Candidate,
  policy: Policy,
): boolean {
  return (
    candidate.lifecycle === "active" &&
    candidate.score.score !== null &&
    candidate.score.completeness >= policy.minimumCompleteness &&
    candidate.score.score >= policy.minimumActionScore &&
    !candidate.projectState.hasConflictingWork &&
    !candidate.projectState.isInReviewHold
  );
}

export function rankCandidates(
  candidates: Candidate[],
  policy: Policy,
): Candidate[] {
  return candidates
    .filter((candidate) => isEligible(candidate, policy))
    .sort((a, b) => {
      const byScore = b.score.score! - a.score.score!;
      if (byScore !== 0) return byScore;

      const aTrend = a.longTrend ?? Number.POSITIVE_INFINITY;
      const bTrend = b.longTrend ?? Number.POSITIVE_INFINITY;
      const byTrend = aTrend - bTrend;
      if (byTrend !== 0) return byTrend;

      const aNet = a.recentNetAcquisition ?? Number.POSITIVE_INFINITY;
      const bNet = b.recentNetAcquisition ?? Number.POSITIVE_INFINITY;
      const byAcquisition = aNet - bNet;
      if (byAcquisition !== 0) return byAcquisition;

      return a.displayName.localeCompare(b.displayName);
    });
}
