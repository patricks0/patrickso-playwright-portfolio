# patrickso-playwright-portfolio
[![CI](https://img.shields.io/github/actions/workflow/status/patricks0/patrickso-playwright-portfolio/playwright.yml?branch=main)](https://github.com/patricks0/patrickso-playwright-portfolio/actions)
![Playwright](https://img.shields.io/badge/Playwright-1.55-green)
![License](https://img.shields.io/badge/license-ISC-blue)
This repository is my automation testing portfolio, built to showcase hands-on expertise with Playwright.
It demonstrates how to design and execute UI tests, API tests, and CI/CD pipelines using modern best practices.

Key highlights:

- ✅ End-to-end UI test automation with Playwright  
- ✅ API testing using Playwright’s built-in request client  
- ✅ Environment-driven test execution (.env.dev, .env.staging)  
- ✅ GitHub Actions workflows for continuous testing (UI + API)  
- ✅ Use of fixtures, page objects, and network mocking for reliability  

The goal of this repo is to provide a realistic, recruiter-friendly example of automation testing skills — from framework setup to running tests in CI with reporting and artifacts.

**Project Structure**
- `tests/ui/playground`: UI tests for UITestingPlayground pages.
- `tests/ui/playground/page-objects`: Page Object Model classes used by UI tests.
- `tests/ui/ecommerce`: Example UI tests for a public ecommerce site.
- `tests/api`: API tests using Playwright’s request client.
- `tests/fixtures`: Reusable Playwright fixtures (e.g., seeded Faker data).
- `tests/data`: Test data utilities (constants, factories/builders).
- `playwright.config.ts`: Projects (`dev`, `staging`, `api`), base URLs, and reporters.
- `.github/workflows/playwright.yml`: GitHub Actions workflow to run tests and publish reports.

**Setup Instructions**
- Prerequisites: Node.js 18+ and npm
- Install deps: `npm install`
- Install Playwright browsers: `npx playwright install --with-deps`
- Optional: copy `.env.example` to `.env.dev` and adjust base URLs/keys if needed.

**Run Commands**
- All tests: `npm test`
- UI (dev project): `npm run test:dev`
- UI (staging project): `npm run test:staging`
- API tests: `npm run test:api`
- Headed mode: `npm run test:headed`
- Debug mode: `npm run test:debug`
- Filter by title: `npx playwright test -g "Dynamic Table"`
- Single spec: `npx playwright test tests/ui/playground/usePageObjectModel.spec.ts`

**Reports & Artifacts**
- Playwright HTML report: `npm run pw:report`
- Allure (local):
  - Generate + open: `npm run allure-report`
  - Live server: `npm run allure:serve`
- CI artifacts (GitHub Actions): workflow uploads `playwright-report/`, `allure-report/`, and `allure-results/` on every run.

Live Allure Report (GitHub Pages)
- After CI publishes, view the latest Allure HTML at:
  - https://patricks0.github.io/patrickso-playwright-portfolio/
  - Note: The page appears after the first successful Pages deployment from Actions.

**Viewing CI Allure Report**
- Download the `allure-report` artifact from a run and open it with:
  - `npx -y allure-commandline open <path-to-allure-report>` (auto‑serves on a free port), or
  - `npx -y http-server <path-to-allure-report> -p 5051 -o`
- If you downloaded `allure-results`, generate then open:
  - `npx -y allure-commandline generate <path-to-allure-results> --clean -o <path-to-allure-report>`
  - `npx -y allure-commandline open <path-to-allure-report>`
 - Tip: avoid opening `index.html` via `file://` — serve it over HTTP.

**Highlighted Examples**
- AJAX + Dialog handling: `tests/ui/playground/classAttributeButton.spec.ts`
- Dynamic Table with intent helpers: `tests/ui/playground/usePageObjectModel.spec.ts`
- Network mocking: `tests/ui/playground/networkMock.spec.ts`
- Accessibility (axe-core): `tests/ui/playground/a11y.spec.ts` (skips unless `@axe-core/playwright` is installed)
- Visual snapshot (local-only): `tests/ui/playground/visualHeader.spec.ts` (skipped by default)

**Environment Setup**
- Copy `.env.example` → `.env.dev` and adjust as needed for local runs.
- In CI, variables are injected by the workflow; local `.env.dev` is ignored on CI.

**Linting & Formatting**
- Lint: `npm run lint` (ESLint)
- Format: `npm run format` (Prettier)

**Conventions**
- Tags: add short tags in titles for quick filtering, e.g. `test('@smoke Dynamic Table …', …)` and run with `npx playwright test --grep @smoke`.
- Grouping: use `test.describe()` to group related specs and `test.step()` to make reports readable.
- POM usage: property‑style via `PageManager` (e.g., `await pm.navigateTo().dynamicTablePage(); const cpu = await pm.onDynamicTable.captureValueofCpu('Chrome');`).
- Naming: prefer intent‑based helpers in page objects (e.g., `captureValueofCpu`) instead of raw locator logic in tests.

**Mobile Emulation (local)**
- Add a mobile project temporarily and run a stable spec:
  - `npx playwright test --project=dev --device='Pixel 5'`
  - Or add a dedicated project in config with `use: { ...devices['Pixel 5'] }`.

**Test Strategy**
- UI Tests: POM with property-style via `PageManager`, resilient ARIA selectors, centralized navigation, seeded data where needed, state-based assertions, CI artifacts on failure.
- API Tests: Playwright request client with env-configured base URL; validate status, headers, and body; include negative cases; keep tests stateless/idempotent.

**Roadmap**
- Expand UITAP coverage; add network mocking and visual examples; CI matrix once stable; ESLint/Prettier usage in CI; publish reports via Pages.

**CI & Quality (optional upgrades)**
- Add a Lint job in `.github/workflows/playwright.yml` and make tests depend on it (`needs: [lint]`).
- Add a nightly smoke run with `schedule` + `--grep @smoke`.
- Publish CI Allure to GitHub Pages: add a Pages upload/deploy step, then link the live report in this README.
