import { test, expect } from "../fixtures/fixtures.registry";
import { LoginPage } from "../pages/LoginPage";
import {
    standardUser,
    standardPassword,
    lockedOutUser,
    lockedOutPassword,
} from "../config/credentials";

test.describe("Login with no username", () => {
    test("Login without username and password", async ({ loginPage, page }) => {
        const username = "";
        const password = "";
        const errorAlert = loginPage.getErrorAlert();
        await loginPage.login(username, password);

        await expect(
            errorAlert,
            "Login must fail. Error message must be displayed",
        ).toBeVisible();

        await expect(errorAlert).toHaveText(/username is required$/i);

        await expect(
            page,
            "On a failed login attempt, the user must remain on the login page",
        ).toHaveURL(LoginPage.url);
    });

    test("Login without username and some random password", async ({
        loginPage,
        page,
    }) => {
        const username = "";
        const password = "some-random-password";
        const errorAlert = loginPage.getErrorAlert();
        await loginPage.login(username, password);

        await expect(
            errorAlert,
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(/username is required$/i);
        await expect(
            page,
            "On a failed login attempt, the user must remain on the login page",
        ).toHaveURL(LoginPage.url);
    });
});

test.describe("Login as a standard user", () => {
    test("Login with valid credentials", async ({ loginPage, page }) => {
        const username = standardUser;
        const password = standardPassword;
        await loginPage.login(username, password);

        await expect(
            page,
            "Successful login attempt: the user is redirected to the inventory page",
        ).toHaveURL(LoginPage.successfulRedirectURL);
    });

    test("Login without a password", async ({ loginPage, page }) => {
        const username = "some-username";
        const password = "";
        const errorAlert = loginPage.getErrorAlert();
        await loginPage.login(username, password);

        await expect(
            errorAlert,
            "Login must fail. Error message must be displayed",
        ).toBeVisible();

        await expect(errorAlert).toHaveText(/password is required/i);

        await expect(
            page,
            "On a failed login attempt, the user must remain on the login page",
        ).toHaveURL(LoginPage.url);
    });

    test("Login with invalid password", async ({ loginPage, page }) => {
        const username = standardUser;
        const password = "some-random-password";
        const errorAlert = loginPage.getErrorAlert();
        await loginPage.login(username, password);

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
        ).toHaveURL(LoginPage.url);
    });
});

test.describe("Login as locked out user", () => {
    test("Login using valid credentials", async ({ loginPage, page }) => {
        const username = lockedOutUser;
        const password = lockedOutPassword;
        const errorAlert = loginPage.getErrorAlert();
        await loginPage.login(username, password);

        await expect(
            errorAlert,
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(/this user has been locked out/i);
        await expect(
            page,
            "A locked-out user's login always fails, so the user remains on the login page",
        ).toHaveURL(LoginPage.url);
    });

    test("Login with no password", async ({ loginPage, page }) => {
        const username = lockedOutUser;
        const password = "";
        const errorAlert = loginPage.getErrorAlert();
        await loginPage.login(username, password);

        await expect(
            errorAlert,
            "Login must fail. Error message must be displayed",
        ).toBeVisible();
        await expect(errorAlert).toHaveText(/password is required$/i);
        await expect(
            page,
            "A locked-out user's login always fails, so the user remains on the login page",
        ).toHaveURL(LoginPage.url);
    });

    test("Login with invalid password", async ({ loginPage, page }) => {
        const username = lockedOutUser;
        const password = "invalid-password";
        const errorAlert = loginPage.getErrorAlert();
        await loginPage.login(username, password);

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
        ).toHaveURL(LoginPage.url);
    });
});
