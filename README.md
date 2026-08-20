# Market Recovery Intelligence — Technical Showcase

![Market Recovery Intelligence social preview](assets/social-preview.png)

A public, portfolio-safe technical case study for a full-stack market intelligence and recovery-management platform.

> **Important:** This repository is a sanitized showcase. All market names, KPI values, charts, and recommendation examples are synthetic. It contains no customer data, production credentials, live database identifiers, or confidential market-performance records.

## What this showcase demonstrates

The underlying project turns multiple operational data sources into a controlled decision-support workflow:

```text
Sales CSV + Disconnect CSV + Weekly Subscriber XLSX
                    ↓
           Parsing / normalization
                    ↓
        Canonical market identity
                    ↓
       Derived activity + trends
                    ↓
        Canonical recovery score
                    ↓
  Data quality + lifecycle + project state
                    ↓
        Recommendation ranking
                    ↓
          Market Investigation
                    ↓
           Recovery Project
                    ↓
           Measured outcome
```

The showcase focuses on the engineering story rather than exposing production data or proprietary scoring details.

## Highlights

- Next.js / TypeScript application architecture
- Supabase / PostgreSQL analytical backend
- CSV and XLSX ingestion
- Normalized sales and disconnect events
- Historical subscriber snapshots
- Canonical market identity and mapping controls
- Trend analysis across multiple time windows
- Churn-driver classification
- Coverage-aware recovery scoring
- Recommendation eligibility and ranking
- Recovery-project lifecycle and frozen measurement snapshots
- Database read-path optimization
- Shared domain/data-layer refactor
- Browser, lint, build, migration, and rollback discipline

## Interactive demo

The homepage includes a synthetic Market Investigation experience with fictional markets. The demo updates:

- recovery priority
- current subscribers
- long-term trend
- 30-day acquisition
- recoverable churn
- churn-driver composition
- recovery-signal contribution
- action eligibility
- recommendation focus
- lifecycle / limited-history behavior

No production APIs or databases are called. Everything is static and safe for GitHub Pages.

## Local preview

There are no runtime dependencies or build steps.

From the repository root:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

You can also open `index.html` directly in a browser.

## GitHub Pages deployment

A GitHub Actions workflow is included at:

```text
.github/workflows/pages.yml
```

To publish:

1. Create a new public GitHub repository.
2. Upload/push the contents of this showcase.
3. In **Settings → Pages**, choose **GitHub Actions** as the source if GitHub has not already selected it.
4. Push to `main`.
5. The workflow deploys the static site.

## Repository structure

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── architecture.svg
│   ├── data-model.svg
│   ├── favicon.svg
│   └── social-preview.png
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ENGINEERING_DECISIONS.md
│   ├── PRIVACY.md
│   └── SHOWCASE_NOTES.md
├── .github/workflows/pages.yml
├── LICENSE
└── README.md
```

## Public abstraction policy

This case study deliberately keeps the following private:

- customer names, addresses, and account information
- employee/internal-user information
- production Supabase URL/project identifiers/keys
- raw production sales and disconnect records
- real distressed-market ranking
- confidential commercial performance
- exact production scoring weights and cutoffs
- internal-only operational notes

The architecture, engineering patterns, and synthetic interaction design remain representative of the actual system.

## Technical case-study documents

- [Architecture](docs/ARCHITECTURE.md)
- [Engineering decisions](docs/ENGINEERING_DECISIONS.md)
- [Privacy / sanitization policy](docs/PRIVACY.md)
- [GitHub showcase setup notes](docs/SHOWCASE_NOTES.md)

## License

The showcase code is provided under the MIT License. This does **not** grant rights to production data, private source systems, company trademarks, or proprietary internal datasets.
