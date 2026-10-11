# CI/CD Strategy

## Purpose

The pipeline gives fast feedback before code is merged while maintaining confidence that the regression suite works across supported desktop browser engines.

## Execution strategy

Pull requests to `main` run tests tagged `@smoke` in Chromium. These cover critical login, product visibility, cart, and checkout paths. Chromium provides fast feedback while exercising the primary user journey.

Pushes to `main` run all tests tagged `@regression` in Chromium, Firefox, and WebKit. This matrix detects browser compatibility issues after review without making every pull request wait for the longer cross-browser suite.

## Retry strategy

Local runs use zero retries so failures are immediately visible. CI uses two retries, configured in `playwright.config.ts`, because hosted environments and public training sites can experience transient failures. Playwright records a trace on the first retry, avoiding trace collection for successful tests.

## Environment management

The workflow supplies `BASE_URL`. Sauce Demo uses public training credentials, so local defaults are suitable for this portfolio. A production-like environment must store `TEST_USERNAME` and `TEST_PASSWORD` as GitHub Actions secrets; `.env` is ignored and must never be committed.

## Reporting and artifacts

Every run produces an HTML report and JUnit XML. The HTML report uploads whether tests pass or fail. When a job fails, `test-results/` uploads separately to retain screenshots, videos, traces, error context, and JUnit output. Artifacts are retained for 14 days.

## Quality gates

TypeScript compilation runs before browser tests. A type-check or test failure fails the job and prevents a successful status check. ESLint is not currently configured, so CI does not claim a lint gate that does not exist.

## CI versus local execution

Local development supports interactive UI, headed, debug, and single-browser commands. CI runs headless, uses a predictable worker setting, retries transient issues, and preserves failure diagnostics. This keeps local feedback convenient and CI evidence consistent.
