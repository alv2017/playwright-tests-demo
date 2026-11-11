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

export class CheckoutStepTwoPage extends CheckoutBaseStepTwoPage {}
