-- PUBLIC PSEUDOCODE
-- Demonstrates write-time revalidation and atomic baseline capture.

BEGIN;

-- Lock/re-read current candidate state.
SELECT *
FROM recommendation_candidate
WHERE market_id = :market_id
FOR UPDATE;

-- Application/RPC policy checks occur here:
--   candidate is still eligible
--   no conflicting project exists
--   lifecycle allows new work

INSERT INTO recovery_projects (
  market_id,
  status,
  started_at
)
VALUES (
  :market_id,
  'in_progress',
  CURRENT_TIMESTAMP
)
RETURNING id INTO :project_id;

INSERT INTO project_snapshots (
  project_id,
  snapshot_type,
  captured_at,
  payload
)
VALUES (
  :project_id,
  'baseline',
  CURRENT_TIMESTAMP,
  :current_measurement_payload
);

COMMIT;
