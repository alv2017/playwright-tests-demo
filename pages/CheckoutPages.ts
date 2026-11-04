import { Page } from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage";

class CheckoutBaseStepOnePage {
    protected readonly page: Page;

    static readonly url: string = "/checkout-step-one.html";
    static readonly maxNumberOfProductsInCart: number = 6;
    numberOfProducts: number;

    constructor(page: Page, numberOfProducts: number) {
        this.page = page;
        this.numberOfProducts = numberOfProducts;
    }

    getPlaywrightPage(): Page {
        return this.page;
    }

    get url(): string {
        return CheckoutBaseStepOnePage.url;
    }

    async navigate(): Promise<void> {
        const shoppingCartPage = new ShoppingCartPage(
            this.page,
            this.numberOfProducts,
        );
        await shoppingCartPage.locateCheckoutButton().click();
    }
}

export class CheckoutStepOnePage extends CheckoutBaseStepOnePage {}
