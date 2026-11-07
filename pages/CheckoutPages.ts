import { Page } from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage";
import { BasePage } from "./BasePage";

class CheckoutBaseStepOnePage extends BasePage {
    static readonly url: string = "/checkout-step-one.html";
    static readonly maxNumberOfProductsInCart: number = 6;
    numberOfProducts: number;

    constructor(page: Page, numberOfProducts: number) {
        super(page);
        this.numberOfProducts = numberOfProducts;
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
