import { Page, Locator } from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage";
import { BasePage } from "./BasePage";

import { userFirstName, userLastName, userZipCode } from "../config/test.data";

class CheckoutBaseStepOnePage extends BasePage {
    static readonly url: string = "/checkout-step-one.html";
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
        await shoppingCartPage.navigate();
        await shoppingCartPage.locateCheckoutButton().click();
    }
}

export class CheckoutStepOnePage extends CheckoutBaseStepOnePage {
    locateSecondaryHeader(): Locator {
        return this.page.getByTestId("secondary-header").getByTestId("title");
    }

    locateCheckoutInformationForm(): Locator {
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

    locateError(): Locator {
        return this.page.getByRole("alert").getByText(/^Error:/);
    }

    async enterFormInformation(
        firstName: string,
        lastName: string,
        zipCode: string,
    ): Promise<void> {
        await this.locateFirstNameInput().fill(firstName);
        await this.locateLastNameInput().fill(lastName);
        await this.locateZipCodeInput().fill(zipCode);
    }

    async submitFormInformation(
        firstName: string,
        lastName: string,
        zipCode: string,
    ): Promise<void> {
        await this.enterFormInformation(firstName, lastName, zipCode);
        await this.locateContinueButton().click();
    }
}

class CheckoutBaseStepTwoPage extends BasePage {
    static readonly url: string = "/checkout-step-two.html";
    numberOfProducts: number;

    constructor(page: Page, numberOfProducts: number) {
        super(page);
        this.numberOfProducts = numberOfProducts;
    }

    get url(): string {
        return CheckoutBaseStepTwoPage.url;
    }

    async navigate(): Promise<void> {
        const checkoutStepOnePage = new CheckoutStepOnePage(
            this.page,
            this.numberOfProducts,
        );
        await checkoutStepOnePage.navigate();
        await checkoutStepOnePage.submitFormInformation(
            userFirstName,
            userLastName,
            userZipCode,
        );
    }
}

export class CheckoutStepTwoPage extends CheckoutBaseStepTwoPage {
    locateSecondaryHeader(): Locator {
        return this.page.getByTestId("secondary-header").getByTestId("title");
    }

    locateCartList(): Locator {
        return this.page.getByTestId("cart-list");
    }

    locateCartProducts(): Locator {
        return this.page.getByTestId("inventory-item");
    }

    locateCartProductName(product: Locator): Locator {
        return product.getByTestId("inventory-item-name");
    }

    locateCartProductQuantity(product: Locator): Locator {
        return product.getByTestId("item-quantity");
    }

    locateCartProductPrice(product: Locator): Locator {
        return product.getByTestId("inventory-item-price");
    }

    locateCartProductPrices(): Locator {
        return this.page.getByTestId("inventory-item-price");
    }

    locatePaymentInfoLabel(): Locator {
        return this.page.getByTestId("payment-info-label");
    }

    locatePaymentInfoValue(): Locator {
        return this.page.getByTestId("payment-info-value");
    }

    locateShippingInfoLabel(): Locator {
        return this.page.getByTestId("shipping-info-label");
    }

    locateShippingInfoValue(): Locator {
        return this.page.getByTestId("shipping-info-value");
    }

    locatePriceTotalInfoLabel(): Locator {
        return this.page.getByTestId("total-info-label");
    }

    locateItemTotalLabel(): Locator {
        return this.page.getByTestId("subtotal-label");
    }

    locateTaxLabel(): Locator {
        return this.page.getByTestId("tax-label");
    }

    locateTotalLabel(): Locator {
        return this.page.getByTestId("total-label");
    }

    locateCancelButton(): Locator {
        return this.page.getByRole("button", { name: "Cancel", exact: true });
    }

    locateFinishButton(): Locator {
        return this.page.getByRole("button", { name: "Finish", exact: true });
    }
}

class CheckoutBaseCompletePage extends BasePage {
    static readonly url: string = "/checkout-complete.html";
    numberOfProducts: number;

    constructor(page: Page, numberOfProducts: number) {
        super(page);
        this.numberOfProducts = numberOfProducts;
    }

    get url(): string {
        return CheckoutBaseCompletePage.url;
    }

    async navigate(): Promise<void> {
        const checkoutStepTwo = new CheckoutStepTwoPage(
            this.page,
            this.numberOfProducts,
        );
        await checkoutStepTwo.locateFinishButton().click();
    }
}

export class CheckoutCompletePage extends CheckoutBaseCompletePage {}
