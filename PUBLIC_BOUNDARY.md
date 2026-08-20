# Public Abstraction Boundary

This repository is a portfolio case study, not a source release of the underlying operational system.

## Included

- synthetic market scenarios
- neutral database/object aliases
- representative architecture diagrams
- representative TypeScript/SQL patterns
- generalized data-flow and decision-flow documentation
- generalized performance-engineering lessons
- static interactive UI reconstruction

## Intentionally excluded

- customer, employee, or account data
- real operational market rankings
- raw reports or production exports
- production URLs, credentials, tokens, project IDs, or connection strings
- exact production schema/object identifiers
- exact private score weights and action cutoffs
- internal pricing, margin, or commercial-performance data
- vendor/customer operational notes
- screenshots that expose private administration or production identifiers

## Public-code rule

Examples in `examples/` are written specifically for this showcase. They demonstrate engineering patterns without being copied from production source.

## Synthetic-data rule

Every market name and metric in the interactive demo is fictional. The demo does not call a production API.

## Future additions

Before adding a screenshot, export, log, migration, or code sample, check for:

1. real names or addresses
2. account IDs or UUIDs
3. production URLs
4. environment variables or credentials
5. real market performance
6. exact private thresholds/weights
7. internal comments or operational notes
8. production object names that are not necessary to explain the pattern

When technical depth is useful, prefer a reconstructed example over a direct production artifact.
