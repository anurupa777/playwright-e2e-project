# Playwright E2E Project

This repository contains an end-to-end test suite using Playwright for testing the CURA Healthcare demo app.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your test credentials if required.

## Run tests

Run a specific test file:

```bash
npx playwright test tests/functional/mytest.spec.ts
```

Run all tests:

```bash
npx playwright test
```

## Current Fixes

- Corrected Playwright config to use ESM-safe `path.resolve(...)` for `globalSetup`/`globalTeardown`.
- Switched config export to `export default defineConfig(...)` for Playwright compatibility.
- Added debug script path fix for `debug/play.ts`.

## Notes

- The project uses the Playwright test runner and the `@playwright/test` package.
- `globalSetup` clears the `allure-results` folder for local runs.
- `globalTeardown` starts an Allure report server for local runs when `RUNNER=LOCAL`.
