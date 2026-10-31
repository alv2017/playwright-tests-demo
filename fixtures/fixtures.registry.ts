import { test as base } from "@playwright/test";

import type { InventoryPage } from "../pages/InventoryPage";
import { inventoryPageFixture } from "./page_fixtures/inventory.page.fixture";

import type { LoginPage } from "../pages/LoginPage";
import { loginPageFixture } from "./page_fixtures/login.page.fixture";

type PageFixtures = {
    inventoryPage: InventoryPage;
    loginPage: LoginPage;
};

export const test = base.extend<PageFixtures>({
    inventoryPage: inventoryPageFixture,
    loginPage: loginPageFixture,
});

export { expect } from "@playwright/test";
