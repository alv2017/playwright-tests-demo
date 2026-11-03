import { Page, Locator } from "@playwright/test";
import { LoginPage } from "./LoginPage";

import { standardUser, standardPassword } from "../config/credentials";

class InventoryPageBase {
    protected readonly page: Page;

    static readonly url: string = "/inventory.html";

    constructor(page: Page) {
        this.page = page;
    }

    getPlaywrightPage(): Page {
        return this.page;
    }

    get url(): string {
        return InventoryPageBase.url;
    }

    async navigate(): Promise<void> {
        const loginPage = new LoginPage(this.page);
        await loginPage.navigate();
        await loginPage.login(standardUser, standardPassword);
    }
}

export class InventoryPage extends InventoryPageBase {
    locateSecondaryHeader(): Locator {
        return this.page.getByTestId("secondary-header").getByTestId("title");
    }

    locateShoppingCartButton(): Locator {
        return this.page.getByTestId("shopping-cart-link");
    }

    locateProductContainer(): Locator {
        return this.page.locator(".inventory_list");
    }

    locateProductItems(): Locator {
        return this.locateProductContainer().locator(".inventory_item");
    }

    locateFirstProduct(): Locator {
        return this.locateProductItems().first();
    }

    locateNthProduct(i: number): Locator {
        return this.locateProductItems().nth(i);
    }

    locateProductImage(product: Locator) {
        return product.locator("img.inventory_item_img");
    }

    locateProductName(product: Locator) {
        return product.locator(".inventory_item_name");
    }

    locateProductNames() {
        return this.locateProductItems().locator(".inventory_item_name");
    }

    locateProductDescription(product: Locator) {
        return product.locator(".inventory_item_description");
    }

    locateProductPrice(product: Locator) {
        return product.locator(".inventory_item_price");
    }

    locateProductPrices() {
        return this.locateProductItems().locator(".inventory_item_price");
    }

    locateProductAddToCartButton(product: Locator) {
        return product.getByRole("button", { name: /^add to cart$/i });
    }

    locateProductRemoveFromCartButton(product: Locator) {
        return product.getByRole("button", { name: "Remove", exact: true });
    }

    locateActiveProductOrderOption() {
        return this.page
            .locator(".select_container")
            .getByTestId("active-option");
    }

    locateProductOrderOptionSelector() {
        return this.page.locator(".select_container").locator("select");
    }
}
