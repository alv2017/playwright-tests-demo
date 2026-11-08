import { Page, Locator } from "@playwright/test";
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

export class CheckoutStepOnePage extends CheckoutBaseStepOnePage {
    locateSecondaryHeader(): Locator {
        return this.page.getByTestId("secondary-header").getByTestId("title");
    }

    locateCheckoutForm(): Locator {
        return this.page.getByRole("form", {
            name: "Checkout information",
            exact: true,
        });
    }

    locateFirstNameInput(): Locator {
        return this.page.getByPlaceholder("First Name", { exact: true });
    }

    locateLastNameInput(): Locator {
        return this.page.getByPlaceholder("Last Name", { exact: true });
    }

    locateZipCodeInput(): Locator {
        return this.page.getByPlaceholder("Zip/Postal Code", { exact: true });
    }

    locateCancelButton(): Locator {
        return this.page.getByRole("button", { name: "Cancel", exact: true });
    }

    locateContinueButton(): Locator {
        return this.page.getByRole("button", { name: "Continue", exact: true });
    }
}
