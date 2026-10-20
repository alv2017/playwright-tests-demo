# Playwright Test Demo

This project shows how to set up an end-to-end (`E2E`) testing project with Playwright.

The following topics are covered:

- Installing Playwright and starting a new testing project
- Writing tests with Playwright
- Running Playwright tests
- Setting up CI/CD pipeline with GitHub Actions

## 1. `Playwright Library` vs `Playwright Test`

`Playwright Library` provides a set of APIs to automate browser tasks such as:

- launching browsers in headless or headed mode;
- interacting with web pages by clicking buttons and filling out forms;
- executing JavaScript in the browser's context.


`Playwright Test` builds on top of the `Playwright Library`. It makes automated testing easier by offering:

- built-in test runner to recognize test files automatically, run them in parallel, and support multiple browsers;

- generation of visual reports;

- debugging test failures via CLI;

- command-line options to run tests, record videos for debug failures, and more.