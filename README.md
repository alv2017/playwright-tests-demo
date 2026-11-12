# Playwright Test Demo

An end-to-end (E2E) testing project built with [Playwright Test](https://playwright.dev/docs/intro) and TypeScript. The tests exercise [SauceDemo](https://www.saucedemo.com/), a sample e-commerce application maintained by Sauce Labs for testing practice.

This repository demonstrates:
- Writing and running browser-based tests with Playwright Test
- Organizing tests, page objects, fixtures, and test data
- Running tests in Chromium, Firefox, and WebKit
- Linting, formatting, and running tests in GitHub Actions

## 1. Run this repository locally

**Prerequisites:** Install a supported [Node.js](https://nodejs.org/) version and npm.

```bash
git clone https://github.com/alv2017/playwright-tests-demo.git
cd playwright-tests-demo
npm ci
npx playwright install
```

On Linux, you may need `npx playwright install --with-deps` to install browser system dependencies.

### Configure test credentials

The configuration loads environment variables from `env/.env`. Create that file locally and set these variables using the demo credentials shown on the [SauceDemo login page](https://www.saucedemo.com/):

```dotenv
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
LOCKED_OUT_USER=locked_out_user
LOCKED_OUT_PASSWORD=secret_sauce
```

These values are for the public SauceDemo practice site, not real accounts. Do not commit private credentials or other secrets. The repository's `.gitignore` excludes `.env` files.

### Run tests

```bash
# Run the full test suite in all configured browser projects
npx playwright test

# Run tests from the tests directory
npx playwright test tests/

# Run one test file
npx playwright test tests/login.spec.ts

# Run the login tests in Chromium only
npx playwright test tests/login.spec.ts --project=chromium

# Show the browser during tests
npx playwright test --headed

# Debug the login tests
npx playwright test tests/login.spec.ts --debug

# Open the generated HTML report
npx playwright show-report
```

The [Playwright configuration](playwright.config.ts) defines the `chromium`, `firefox`, and `webkit` projects. It runs tests headlessly by default and writes HTML reports to `playwright-report/`. For additional commands and options, see the [Playwright CLI documentation](https://playwright.dev/docs/test-cli).

### Code quality checks

```bash
npm run lint
npm run format:check
npx tsc --noEmit
```

## 2. Start a new Playwright project (tutorial)

If you want to create a *separate* project from scratch, use either of the following approaches. You do **not** need to repeat these steps after cloning this repository.

### 2.1 Recommended: guided setup

```bash
npm init playwright@latest
```

The setup wizard installs Playwright Test and can generate `playwright.config.ts`, example tests, and a GitHub Actions workflow.

### 2.2 Manual setup

```bash
mkdir playwright-tests-demo
cd playwright-tests-demo
npm init -y
npm install --save-dev @playwright/test
npx playwright install
```

`npm init -y` creates `package.json` to manage dependencies. `@playwright/test` includes the Playwright Test runner and browser automation APIs; installing the standalone `playwright` package separately is unnecessary for this setup. Create your own `playwright.config.ts` and tests after installation.

### Playwright library vs. Playwright Test

The **Playwright library** provides browser automation APIs for launching browsers, navigating pages, clicking elements, filling forms, and evaluating JavaScript.

**Playwright Test** builds on those APIs and adds a test runner, assertions, fixtures, parallel execution, browser projects, retries, debugging tools, and HTML reports.

## 3. Project layout

- `tests/` — E2E test specifications, including `tests/login.spec.ts`
- `pages/` — page objects used by tests
- `fixtures/` — custom test fixtures
- `config/` — credentials and test data
- `playwright.config.ts` — browser projects, timeouts, reporters, and shared settings
- `.github/workflows/playwright.yml` — CI checks, tests, and report publishing

## 4. Continuous integration

The [GitHub Actions workflow](.github/workflows/playwright.yml) runs on pushes and pull requests targeting `main`. It installs dependencies, checks linting and formatting, checks TypeScript, lists the tests, and runs the E2E suite in **Chromium**. Local runs use all configured browser projects unless you select one.

The CI test job reads these GitHub Actions secrets: `STANDARD_USER`, `STANDARD_PASSWORD`, `LOCKED_OUT_USER`, and `LOCKED_OUT_PASSWORD`. Configure them under your repository's **Settings → Secrets and variables → Actions** when using this workflow in your own repository.

The workflow uploads the Playwright HTML report as an artifact. It also contains a GitHub Pages deployment job for reports, subject to repository permissions and workflow conditions.

## 5. Further reading

- [Playwright Test: getting started](https://playwright.dev/docs/intro)
- [Running and debugging tests](https://playwright.dev/docs/running-tests)
- [Test configuration](https://playwright.dev/docs/test-configuration)
- [GitHub Actions](https://docs.github.com/en/actions)
