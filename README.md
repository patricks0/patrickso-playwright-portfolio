# patrickso-playwright-portfolio

[![CI](https://github.com/patricks0/patrickso-playwright-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/patricks0/patrickso-playwright-portfolio/actions/workflows/playwright.yml)
[![Playwright](https://img.shields.io/badge/playwright-1.35.1-blue)](https://playwright.dev)
[![License](https://img.shields.io/github/license/patricks0/patrickso-playwright-portfolio)](LICENSE)

This repository contains a Playwright testing portfolio showcasing various testing techniques and strategies.

Key highlights:
- UI tests using Page Object Model with property-style access via `PageManager`.
- Use of resilient ARIA selectors and centralized navigation.
- Seeded data where needed and state-based assertions.
- API tests using Playwright request client with environment-configured base URL.
- Validation of status, headers, and body, including negative cases.
- Tests designed to be stateless and idempotent.
- Integration with CI pipelines and artifact generation on failures.
- Use of Allure reporting and live report viewing.

Description and notes:
This project demonstrates best practices in Playwright test automation, including structuring, reporting, and test design. It is intended to serve as a reference and starting point for building robust UI and API test suites.

Project Structure:
- `tests/ui/` - UI test suites.
- `tests/api/` - API test suites.
- `tests/ecommerce/` - Ecommerce related tests.
- `pages/` - Page Object Model classes.
- `utils/` - Utility functions and helpers.
- `reports/` - Test reports and artifacts.
- `playwright.config.ts` - Playwright configuration file.
- `package.json` - Project dependencies and scripts.

Setup Instructions:
- Clone the repository.
- Run `npm install` to install dependencies.
- Configure environment variables as needed.
- Ensure browsers are installed via Playwright (`npx playwright install`).

Run Commands:
- Run UI tests: `npm run test:ui`
- Run API tests: `npm run test:api`
- Run Ecommerce tests: `npm run test:ecommerce`

Reports & Artifacts:
- Playwright generates HTML reports in the `reports/playwright` directory.
- Allure reports are generated in the `reports/allure` directory.
- CI pipelines collect artifacts on test failures for debugging.
- Live Allure report can be viewed locally using `allure serve` command.
- Live Allure Report: [View Report](https://patricks0-playwright-portfolio-allure.netlify.app)
- CI Allure report viewing is configured in the pipeline for easy access.

Highlighted Examples:
- Use of PageManager for centralized page object access.
- Resilient selectors using ARIA roles and attributes.
- Centralized navigation helper methods.
- Seeded test data for consistent test runs.
- State-based assertions to improve test reliability.

Ecommerce Suite:
- Scope: Covers key user journeys and API validations for ecommerce workflows.
- Locations: Tests located under `tests/ecommerce/` directory.

Environment Setup:
- Node.js version 18 or higher.
- Playwright installed via npm.
- Browsers installed via Playwright CLI.
- Environment variables configured for API base URLs and credentials.

Linting & Formatting:
- ESLint configured for code quality.
- Prettier used for consistent code formatting.
- Pre-commit hooks enforce linting and formatting checks.

Conventions:
- Tests organized by feature and layer (UI, API, Ecommerce).
- Page Object Model used for UI interactions.
- Environment variables used for configuration.
- Tests designed to be idempotent and stateless.

Assertion Logging:
- Assertions include descriptive messages.
- Failures log relevant state and screenshots.
- Logs captured in CI artifacts for troubleshooting.

Mobile Emulation (local):
- Tests can run with mobile viewport emulation.
- Configuration available in Playwright config for device profiles.

Test Strategy:
- UI Strategy: POM with property-style via `PageManager`, resilient ARIA selectors, centralized navigation, seeded data where needed, state-based assertions, CI artifacts on failure.
- API Strategy: Playwright request client with environment-configured base URL; validate status, headers, and body; include negative cases; keep tests stateless/idempotent.

Roadmap:
- Expand test coverage for additional features.
- Integrate visual regression testing.
- Improve CI pipeline reporting and notifications.
- Add more examples and documentation.

CI & Quality (optional upgrades):
- Add parallel test execution.
- Integrate mutation testing.
- Enhance static analysis and security scanning.
- Implement test flakiness detection and retries.
