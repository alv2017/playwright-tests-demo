import { test as base } from "@playwright/test";

import type { InventoryPage } from "../pages/InventoryPage";
import { inventoryPageFixture } from "./page_fixtures/inventory.page.fixture";

import type { LoginPage } from "../pages/LoginPage";
import { loginPageFixture } from "./page_fixtures/login.page.fixture";

import type { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { shoppingCartPageFixture } from "../fixtures/page_fixtures/shopping.cart.page.fixture";

type ShoppingCartOptions = {
    numberOfProducts: number;
};

type PageFixtures = {
    inventoryPage: InventoryPage;
    loginPage: LoginPage;
    shoppingCartPage: ShoppingCartPage;
};

export const test = base.extend<PageFixtures & ShoppingCartOptions>({
    numberOfProducts: [0, { option: true }],
    inventoryPage: inventoryPageFixture,
    loginPage: loginPageFixture,
    shoppingCartPage: shoppingCartPageFixture,
});

export { expect } from "@playwright/test";
