import { test, expect } from "@playwright/test";

const url = "https://www.saucedemo.com";

const redirectURL = "https://www.saucedemo.com/inventory.html";

test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveURL(url);
});

test.describe("Login with no username", () => {
    test("Login without username and password", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill("");
        await page.getByPlaceholder("Password").fill("");
        await loginButton.click();

        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toHaveText(/username is required$/i);
        await expect(page).toHaveURL(url);
    });

    test("Login without username and some random password", async ({
        page,
    }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill("");
        await page.getByPlaceholder("Password").fill("some-random-password");
        await loginButton.click();

        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toHaveText(/username is required$/i);
        await expect(page).toHaveURL(url);
    });
});

test.describe("Login as a standard user", () => {
    test("Login with valid credentials", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await loginButton.click();
        await expect(page).toHaveURL(redirectURL);
    });

    test("Login without a password", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill("standard_user");
        await loginButton.click();
        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toHaveText(/password is required/i);
        await expect(page).toHaveURL(url);
    });

    test("Login with invalid password", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("invalid-password");
        await loginButton.click();
        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toHaveText(
            /username and password do not match/i,
        );
        await expect(page).toHaveURL(url);
    });
});

test.describe("Login as locked out user", () => {
    test("Login using valid credentials", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill("locked_out_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await loginButton.click();

        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toHaveText(/this user has been locked out/i);
        await expect(page).toHaveURL(url);
    });

    test("Login with no password", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill("locked_out_user");
        await page.getByPlaceholder("Password").fill("");
        await loginButton.click();

        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toHaveText(/password is required$/i);
        await expect(page).toHaveURL(url);
    });

    test("Login with invalid password", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill("locked_out_user");
        await page.getByPlaceholder("Password").fill("invalid-password");
        await loginButton.click();

        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toHaveText(
            /username and password do not match/i,
        );
        await expect(page).toHaveURL(url);
    });
});
