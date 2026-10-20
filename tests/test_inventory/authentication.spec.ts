import { test, expect } from "@playwright/test";

const url = "https://www.saucedemo.com/inventory.html";

test.describe("Inventory page requires authentication", () => {
    test("Check unauthenticated access fails", async ({ page }) => {
        const redirect_url = "https://www.saucedemo.com";
        await page.goto(url);
        await expect(page).toHaveURL(redirect_url);

        await expect(page.getByRole("alert")).toContainText(
            "You can only access '/inventory.html' when you are logged in",
        );
    });

    test("Check authenticated access succeeds", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: "Login" }).click();

        await expect(page).toHaveURL(url);
    });
});
