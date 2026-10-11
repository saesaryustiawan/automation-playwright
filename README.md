# Sauce Demo Playwright Automation

A learning-focused end-to-end automation project for [Sauce Demo](https://www.saucedemo.com/). It models a maintainable QA workflow using TypeScript and Playwright Test.

## Current status

The project includes independent login, product, cart, and checkout tests; centralized test data; Page Objects; and a custom authentication fixture. It covers valid and invalid login, logout, product browsing, cart additions and removal, and completed checkout. CI runs smoke tests on pull requests and multi-browser regression tests after a push to `main`.

## Technology stack

- Node.js and TypeScript
- Playwright Test
- Sauce Demo as the test application
- `dotenv` for local environment configuration

## Project structure

```text
.
├── data/                 # Shared users and business test data
├── fixtures/             # Reusable Playwright test setup
├── .github/workflows/    # GitHub Actions CI pipeline
├── pages/                # Page Object Model classes
├── tests/
│   └── ui/               # Browser-based business-flow tests
├── playwright.config.ts  # Test, browser, artifact, and reporter settings
├── .env.example          # Safe environment-variable template
└── README.md
```

Page Objects keep UI selectors and reusable actions in one place. The tests then read like business scenarios and own the assertions, which makes failures easier to understand and UI changes cheaper to update.

The `authenticatedProductsPage` fixture creates a fresh browser page, logs in, and waits for the inventory page before each test that requests it. Fixtures are useful for repeated, reliable setup; they do not share cart state between tests, so test isolation is preserved.

## Automated scenarios

- Log in with the standard user and verify the inventory URL.
- Log out and verify the login form is available again.
- Check validation messages for invalid, missing, and locked-out credentials.
- Add one or more products, verify the cart badge and contents, and remove a product.
- Enter checkout contact details, review the order, finish checkout, and verify the confirmation.
- Check product visibility, sorting, and product detail content.

Each test starts with a fresh browser context. Tests that need an authenticated inventory page use the shared fixture; cart state is never shared across tests.

## Installation

```bash
npm ci
npx playwright install
```

To customize the target application or credentials, copy `.env.example` to `.env` and edit the values. The `.env` file is intentionally ignored by Git. The provided Sauce Demo credentials are public training credentials; use environment variables or CI secrets for non-public environments.

## Running tests

```bash
npm test                  # All configured browsers
npm run test:headed       # Watch Chromium, Firefox, and WebKit run
npm run test:ui           # Playwright's interactive UI mode
npm run test:debug        # Step through a test with the Playwright Inspector
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:smoke         # Critical flows tagged @smoke
npm run test:regression    # Complete suite tagged @regression
npm run typecheck          # TypeScript quality gate
```

Run one file or test by passing standard Playwright arguments:

```bash
npx playwright test tests/ui/login.spec.ts
npx playwright test -g "sorts products"
```

## Reports and debugging artifacts

Every run creates an HTML report in `playwright-report/` and a JUnit XML file in `test-results/junit.xml`. On a failure, Playwright retains a screenshot and video; on a retry it records a trace.

```bash
npm run test:report
```

These generated artifacts are ignored by Git.

## CI/CD

[![Playwright Tests](https://github.com/saesaryustiawan/automation-exercise-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/saesaryustiawan/automation-exercise-playwright/actions/workflows/playwright.yml)

GitHub Actions runs on pull requests targeting `main` and on pushes to `main`:

- Pull requests run the fast `@smoke` suite in Chromium.
- Pushes to `main` run the complete `@regression` suite in Chromium, Firefox, and WebKit.
- Every run type-checks TypeScript before testing.
- HTML reports are uploaded whether tests pass or fail. On a failure, screenshots, videos, traces, and JUnit results are uploaded from `test-results/`.

`BASE_URL` is supplied through the CI environment. The public Sauce Demo training credentials have local defaults; for a non-public system, store credentials as GitHub Actions secrets and map them to `TEST_USERNAME` and `TEST_PASSWORD` in the workflow. Never commit `.env`.

```text
Developer
  ↓
Git Push / Pull Request
  ↓
GitHub Actions
  ↓
Install Dependencies
  ↓
Type Check
  ↓
Playwright Tests
  ↓
Test Report
  ↓
Artifacts
  ↓
Pass / Fail
```

## Test strategy

Every UI flow receives a fresh page and authentication setup, so no test depends on another test's execution order. Asynchronous transitions are handled with Playwright's auto-waiting locator actions and web-first assertions (`toHaveURL`, `toBeVisible`, `toHaveText`, and `toHaveCount`); the suite does not use fixed sleeps.

The locator strategy prioritizes accessible roles and stable Sauce Demo `data-test` attributes. It deliberately avoids XPath, CSS chains based on layout, and fixed delays.

## Assumptions

- The default target is the public Sauce Demo training site. `BASE_URL` can point to a compatible environment.
- The default account is Sauce Demo's public `standard_user` / `secret_sauce` training account. Set `TEST_USERNAME` and `TEST_PASSWORD` to override it.
- Checkout address means the site's ZIP/postal code field; Sauce Demo does not request street or city fields.
- The test suite performs browser UI checks only. It does not create real purchases or depend on external APIs.
