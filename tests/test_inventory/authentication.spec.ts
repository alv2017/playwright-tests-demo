import { test, expect } from "@playwright/test";
import { standardUser, standardPassword } from "../../config/credentials";

const loginPath = "/";
const inventoryPath = "/inventory.html";

test.describe("Inventory page requires authentication", () => {
    test("Check: unauthenticated access to inventory page fails", async ({
        page,
    }) => {
        await page.goto(inventoryPath);
        await expect(page).toHaveURL(loginPath);
        await expect(page.getByRole("alert")).toContainText(
            "You can only access '/inventory.html' when you are logged in",
        );
    });

    test("Check: after successful login user is redirected to inventory page", async ({
        page,
    }) => {
        await page.goto(loginPath);
        await page.getByPlaceholder("Username").fill(standardUser);
        await page.getByPlaceholder("Password").fill(standardPassword);
        await page.getByRole("button", { name: "Login" }).click();

        await expect(page).toHaveURL(inventoryPath);
    });
});
