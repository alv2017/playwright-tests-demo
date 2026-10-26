import { test, expect } from "@playwright/test";
import {
    standardUser,
    standardPassword,
    lockedOutUser,
    lockedOutPassword,
} from "../config/credentials";


const loginPath = "/";
const redirectPath = "/inventory.html";

test.beforeEach(async ({ page }) => {
    await page.goto(loginPath);
    await expect(page).toHaveURL(loginPath);
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

        await expect(
            errorAlert, 
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(/username is required$/i);
        await expect(
            page, 
            "On a failed login attempt, the user must remain on the login page",
        ).toHaveURL(loginPath);
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

        await expect(
            errorAlert, 
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(/username is required$/i);
        await expect(
            page,
            "On a failed login attempt, the user must remain on the login page",
        ).toHaveURL(loginPath);
    });
});

test.describe("Login as a standard user", () => {
    test("Login with valid credentials", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        await page.getByPlaceholder("Username").fill(standardUser);
        await page.getByPlaceholder("Password").fill(standardPassword);
        await loginButton.click();
        await expect(
            page,
            "Successful login attempt: the user is redirected to the inventory page",
        ).toHaveURL(redirectPath);
    });

    test("Login without a password", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill(standardUser);
        await page.getByPlaceholder("Password").fill(standardPassword);
        await loginButton.click();

        await expect(
            errorAlert, 
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(/password is required/i);
        await expect(
            page,
            "On a failed login attempt, the user must remain on the login page",
        ).toHaveURL(loginPath);
    });

    test("Login with invalid password", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill(standardUser);
        await page.getByPlaceholder("Password").fill("invalid-password");
        await loginButton.click();
        await expect(
            errorAlert, 
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(
            /username and password do not match/i,
        );
        await expect(
            page,
            "On a failed login attempt, the user must remain on the login page",
        ).toHaveURL(loginPath);
    });
});

test.describe("Login as locked out user", () => {
    test("Login using valid credentials", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill(lockedOutUser);
        await page.getByPlaceholder("Password").fill(lockedOutPassword);
        await loginButton.click();

        await expect(
            errorAlert, 
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(/this user has been locked out/i);
        await expect(
            page,
            "A locked-out user's login always fails, so the user remains on the login page",
        ).toHaveURL(loginPath);
    });

    test("Login with no password", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill(lockedOutUser);
        await page.getByPlaceholder("Password").fill("");
        await loginButton.click();

        await expect(
            errorAlert, 
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(/password is required$/i);
        await expect(
            page,
            "A locked-out user's login always fails, so the user remains on the login page",
        ).toHaveURL(loginPath);
    });

    test("Login with invalid password", async ({ page }) => {
        const loginButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
        const errorAlert = page.getByRole("alert");
        await page.getByPlaceholder("Username").fill(lockedOutUser);
        await page.getByPlaceholder("Password").fill("invalid-password");
        await loginButton.click();

        await expect(
            errorAlert, 
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(
            /username and password do not match/i,
        );
        await expect(
            page,
            "A locked-out user's login always fails, so the user remains on the login page",
        ).toHaveURL(loginPath);
    });
});
