-- PUBLIC PSEUDOCODE
-- Representative read-path pattern. Not production SQL.

WITH recent_acquisition AS (
  SELECT
    canonical_entity_id,
    COUNT(*) AS acquisition_count
  FROM acquisition_events
  WHERE event_date >= CURRENT_DATE - :analysis_window
  GROUP BY canonical_entity_id
),
recent_churn AS (
  SELECT
    canonical_entity_id,
    COUNT(*) AS churn_count
  FROM churn_events
  WHERE event_date >= CURRENT_DATE - :analysis_window
  GROUP BY canonical_entity_id
)
SELECT
  m.id,
  m.display_name,
  COALESCE(a.acquisition_count, 0) AS acquisition_count,
  COALESCE(c.churn_count, 0) AS churn_count
FROM market_identity AS m
LEFT JOIN recent_acquisition AS a
  ON a.canonical_entity_id = m.id
LEFT JOIN recent_churn AS c
  ON c.canonical_entity_id = m.id
WHERE m.lifecycle = 'active';

-- Representative supporting index shape:
--
-- CREATE INDEX ON acquisition_events
--   (canonical_entity_id, event_date DESC);
--
-- CREATE INDEX ON churn_events
--   (canonical_entity_id, event_date DESC);
