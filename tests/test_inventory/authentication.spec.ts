import { test, expect } from "@playwright/test";

const loginPath = "/";
const inventoryPath = "/inventory.html";

test.describe("Inventory page requires authentication", () => {
    test("Check unauthenticated access fails", async ({ page }) => {
        await page.goto(inventoryPath);
        await expect(page).toHaveURL(loginPath);
        await expect(page.getByRole("alert")).toContainText(
            "You can only access '/inventory.html' when you are logged in",
        );
    });

    test("Check authenticated access succeeds", async ({ page }) => {
        await page.goto(loginPath);
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();
        // after successful login user redirected to inventory page
        await expect(page).toHaveURL(inventoryPath);
    });
});
