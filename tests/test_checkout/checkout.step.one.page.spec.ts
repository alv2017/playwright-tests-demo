import { test, expect } from "../../fixtures/fixtures.registry";
import { ShoppingCartPage } from "../../pages/ShoppingCartPage";
import {
    userFirstName,
    userLastName,
    userZipCode,
} from "../../config/test.data";
import { CheckoutStepTwoPage } from "../../pages/CheckoutPages";

const productsCount = [0, 1, 2, 6];

test.describe("Checkout Step One Page: Page Structure", () => {
    // parametrization: checking out with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Checking out ${numberOfProducts} product(s): `, () => {
            test.use({ numberOfProducts });

            test.fail(
                numberOfProducts === 0,
                "Checkout should not be allowed when the cart is empty!",
            );

            test(`Check: Checkout page structure with ${numberOfProducts} product(s)`, async ({
                checkoutStepOnePage,
                page,
            }) => {
                await test.step("Check: page url", async () => {
                    await expect(page).toHaveURL(checkoutStepOnePage.url);
                });

                await test.step(`Check: number of products on the cart button is ${numberOfProducts}`, async () => {
                    const shoppingCartButton =
                        checkoutStepOnePage.pageHeader.locateShoppingCartButton();
                    const shoppingCartBadge =
                        checkoutStepOnePage.pageHeader.locateShoppingCartBadge();

                    if (numberOfProducts === 0) {
                        await expect(shoppingCartButton).toHaveAccessibleName(
                            "Cart, empty",
                        );
                        await expect(shoppingCartBadge).toHaveCount(0);
                    } else {
                        await expect(shoppingCartButton).toHaveAccessibleName(
                            `Cart, ${numberOfProducts} items`,
                        );
                        await expect(shoppingCartBadge).toContainText(
                            `${numberOfProducts}`,
                        );
                    }
                });

                await test.step("Check: page header", async () => {
                    const expectedSecondaryHeader =
                        "Checkout: Your Information";
                    const actualSecondaryHeader =
                        checkoutStepOnePage.locateSecondaryHeader();
                    await expect(actualSecondaryHeader).toHaveText(
                        expectedSecondaryHeader,
                    );
                });

                await test.step("Check: page contains info entry form", async () => {
                    const checkoutInformationForm =
                        checkoutStepOnePage.locateCheckoutInformationForm();
                    const firstNameInput =
                        checkoutStepOnePage.locateFirstNameInput();
                    const lastNameInput =
                        checkoutStepOnePage.locateLastNameInput();
                    const zipCodeInput =
                        checkoutStepOnePage.locateZipCodeInput();

                    await expect(checkoutInformationForm).toBeVisible();
                    await expect(firstNameInput).toBeVisible();
                    await expect(lastNameInput).toBeVisible();
                    await expect(zipCodeInput).toBeVisible();
                });

                await test.step("Check: page contains 'Cancel' button", async () => {
                    const cancelButton =
                        checkoutStepOnePage.locateCancelButton();
                    await expect(cancelButton).toHaveCount(1);
                    await expect(cancelButton).toBeVisible();
                });

                await test.step("Check: page contains 'Continue' button", async () => {
                    const continueButton =
                        checkoutStepOnePage.locateContinueButton();
                    await expect(continueButton).toHaveCount(1);
                    await expect(continueButton).toBeVisible();
                });
            });
        });
    }
});

test.describe("Checkout Step One Page: Navigation", () => {
    // parametrization: checking out with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Checking out ${numberOfProducts} product(s): `, () => {
            test.use({ numberOfProducts });

            test.fail(
                numberOfProducts === 0,
                "Checkout should not be allowed when the cart is empty!",
            );

            test("Check: cart button opens cart page", async ({
                checkoutStepOnePage,
                page,
            }) => {
                const cartButton =
                    checkoutStepOnePage.pageHeader.locateShoppingCartButton();
                await cartButton.click();
                await expect(page).toHaveURL(ShoppingCartPage.url);
            });

            test("Check: 'Cancel' button sends user to shopping cart page", async ({
                checkoutStepOnePage,
                page,
            }) => {
                const cancelButton = checkoutStepOnePage.locateCancelButton();
                await cancelButton.click();
                await expect(page).toHaveURL(ShoppingCartPage.url);
            });

            test("'Continue' button sends user to the checkout step two page", async ({
                checkoutStepOnePage,
                page,
            }) => {
                const continueButton =
                    checkoutStepOnePage.locateContinueButton();
                await checkoutStepOnePage.enterFormInformation(
                    userFirstName,
                    userLastName,
                    userZipCode,
                );
                await continueButton.click();

                await expect(page).toHaveURL(CheckoutStepTwoPage.url);
            });
        });
    }
});

test.describe("Checkout Step One Page: Filling User Form", () => {
    // parametrization: checking out with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Checking out ${numberOfProducts} product(s): `, () => {
            test.use({ numberOfProducts });

            test.fail(
                numberOfProducts === 0,
                "Checkout should not be allowed when the cart is empty!",
            );

            test("Check: when form is blank error pops up", async ({
                checkoutStepOnePage,
            }) => {
                const expectedErrorMessage = "Error: First Name is required";
                const continueButton =
                    checkoutStepOnePage.locateContinueButton();
                const firstNameInput =
                    checkoutStepOnePage.locateFirstNameInput();
                const lastNameInput = checkoutStepOnePage.locateLastNameInput();
                const zipCodeInput = checkoutStepOnePage.locateZipCodeInput();
                const errorBlock = checkoutStepOnePage.locateError();

                await expect(firstNameInput).toBeEmpty();
                await expect(lastNameInput).toBeEmpty();
                await expect(zipCodeInput).toBeEmpty();

                await continueButton.click();

                await expect(errorBlock).toBeVisible();
                await expect(errorBlock).toHaveText(expectedErrorMessage);
            });

            test("Check: when first name is missing error pops up", async ({
                checkoutStepOnePage,
            }) => {
                const expectedErrorMessage = "Error: First Name is required";
                const continueButton =
                    checkoutStepOnePage.locateContinueButton();
                const firstNameInput =
                    checkoutStepOnePage.locateFirstNameInput();
                const lastNameInput = checkoutStepOnePage.locateLastNameInput();
                const zipCodeInput = checkoutStepOnePage.locateZipCodeInput();
                const errorBlock = checkoutStepOnePage.locateError();

                await expect(firstNameInput).toBeEmpty();
                await lastNameInput.fill(userLastName);
                await zipCodeInput.fill(userZipCode);

                await continueButton.click();

                await expect(errorBlock).toBeVisible();
                await expect(errorBlock).toHaveText(expectedErrorMessage);
            });

            test("Check: when last name is missing error pops up", async ({
                checkoutStepOnePage,
            }) => {
                const expectedErrorMessage = "Error: Last Name is required";
                const continueButton =
                    checkoutStepOnePage.locateContinueButton();
                const firstNameInput =
                    checkoutStepOnePage.locateFirstNameInput();
                const lastNameInput = checkoutStepOnePage.locateLastNameInput();
                const zipCodeInput = checkoutStepOnePage.locateZipCodeInput();
                const errorBlock = checkoutStepOnePage.locateError();

                await firstNameInput.fill(userFirstName);
                await expect(lastNameInput).toBeEmpty();
                await zipCodeInput.fill(userZipCode);

                await continueButton.click();

                await expect(errorBlock).toBeVisible();
                await expect(errorBlock).toHaveText(expectedErrorMessage);
            });

            test("Check: when zip code is missing error pops up", async ({
                checkoutStepOnePage,
            }) => {
                const expectedErrorMessage = "Error: Postal Code is required";
                const continueButton =
                    checkoutStepOnePage.locateContinueButton();
                const firstNameInput =
                    checkoutStepOnePage.locateFirstNameInput();
                const lastNameInput = checkoutStepOnePage.locateLastNameInput();
                const zipCodeInput = checkoutStepOnePage.locateZipCodeInput();
                const errorBlock = checkoutStepOnePage.locateError();

                await firstNameInput.fill(userFirstName);
                await lastNameInput.fill(userLastName);
                await expect(zipCodeInput).toBeEmpty();

                await continueButton.click();

                await expect(errorBlock).toBeVisible();
                await expect(errorBlock).toHaveText(expectedErrorMessage);
            });
        });
    }
});
