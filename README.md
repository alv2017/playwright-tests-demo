# Playwright Test Demo

## 1. Introduction

This project shows how to set up an end-to-end (`E2E`) testing project with Playwright.

The following topics are covered:

- Installing Playwright and starting a new testing project
- Writing tests with Playwright
- Running Playwright tests
- Setting up a CI/CD pipeline with GitHub Actions

We will write automated tests for https://saucedemo.com website.

`SauceDemo` is a demo e-commerce web application developed by `Sauce Labs`, a company specializing in software testing. Its main purpose is to help QA engineers, developers, and students practice manual and automated testing in a controlled environment.


## 2. Installing Playwright

### 2.1 Manual Installation

1) Install `Node.js`
2) Initialize your Playwright project:

```shell

mkdir playwright-tests-demo
cd playwright-tests-demo
npm init -y
```

This command creates a `package.json` file, which is needed to manage the project dependencies.

3) Install Playwright:

```bash

npm install playwright
```

4) Install Playwright Test package:

```bash

npm install --save-dev @playwright/test
```

5) Install browser binaries:

```bash 

npx playwright install
```


### 2.2 Automated Installation

Alternatively, run:

```bash 

npm init playwright@latest
```

This command starts a guided Playwright project setup. Essentially it covers every step that we described in the section above, and also creates a sample configuration file `playwright.config.ts`. Optionally, it can generate an example test file: `tests/example.spec.ts` and a GitHub Actions workflow file.


### 2.3 `Playwright Library` vs `Playwright Test`

`Playwright Library` provides a set of APIs to automate browser tasks such as:

- launching browsers in headless or headed mode;
- interacting with web pages by clicking buttons and filling out forms;
- executing JavaScript in the browser's context.


`Playwright Test` builds on top of the `Playwright Library`. It makes automated testing easier by offering:

- built-in test runner to recognize test files automatically, run them in parallel, and support multiple browsers;

- generation of visual reports;

- debugging test failures via CLI;

- command-line options to run tests, record videos for debug failures, and more.


## 3. Running Playwright Tests

Run all tests:

```bash

 npx playwright test
 ```
 This command will find and execute all the tests in the project.

We store our tests inside the `tests` directory, the command below will execute only tests located inside the `tests` directory:

```bash 

npx playwright test tests/
``` 

Suppose we want to run tests stored inside the `login.spec.ts` file. In this case we can run tests with:

```bash

npx playwright test tests/login.spec.ts
```

By default the tests are executed in all configured browser projects. Suppose we want to run `login.spec.ts` tests only in the `Chromium` browser. In this case run tests with:

```bash

npx playwright test tests/login.spec.ts --project=chromium
```

Playwright provides much more options for running tests. For more information check the documentation: `https://playwright.dev/docs/intro`.