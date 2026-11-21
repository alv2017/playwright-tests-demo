import { test, expect } from "../../fixtures/fixtures.registry";
import { ShoppingCartPage } from "../../pages/ShoppingCartPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CheckoutCompletePage } from "../../pages/CheckoutPages";

const productsCount = [1, 2, 6];

test.describe("Checkout Step Two Page: Page Structure", () => {
    // parametrization: checking out with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Checking out ${numberOfProducts} product(s): `, () => {
            test.use({ numberOfProducts });

            test(`Check: page structure with ${numberOfProducts} products`, async ({
                checkoutStepTwoPage,
                page,
            }) => {
                await test.step("Check: page url", async () => {
                    await expect(page).toHaveURL(checkoutStepTwoPage.url);
                });

                await test.step(`Check: number of products on the cart button is ${numberOfProducts}`, async () => {
                    const shoppingCartButton =
                        checkoutStepTwoPage.pageHeader.locateShoppingCartButton();
                    const shoppingCartBadge =
                        checkoutStepTwoPage.pageHeader.locateShoppingCartBadge();

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
                    const expectedSecondaryHeader = "Checkout: Overview";
                    const actualSecondaryHeader =
                        checkoutStepTwoPage.locateSecondaryHeader();
                    await expect(actualSecondaryHeader).toHaveText(
                        expectedSecondaryHeader,
                    );
                });

                await test.step("Check: cart list is displayed", async () => {
                    const cartList = checkoutStepTwoPage.locateCartList();
                    await expect(cartList).toHaveCount(1);
                    await expect(cartList).toBeVisible();
                });

                await test.step("Check: Total payment amount is displayed", async () => {
                    const totalAmount = checkoutStepTwoPage.locateTotalLabel();

                    await expect(totalAmount).toHaveCount(1);
                    await expect(totalAmount).toBeVisible();
                    await expect(totalAmount).toHaveText(/^Total: \$/);
                });

                await test.step("Check: page contains 'Cancel' button", async () => {
                    const cancelButton =
                        checkoutStepTwoPage.locateCancelButton();

                    await expect(cancelButton).toHaveCount(1);
                    await expect(cancelButton).toBeVisible();
                });

                await test.step("Check: page contains 'Finish' button", async () => {
                    const finishButton =
                        checkoutStepTwoPage.locateFinishButton();

                    await expect(finishButton).toHaveCount(1);
                    await expect(finishButton).toBeVisible();
                });
            });
        });
    }
});

test.describe("Checkout Step Two Page: Navigation", () => {
    // parametrization: checking out with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Checking out ${numberOfProducts} product(s)`, () => {
            test.use({ numberOfProducts });

            test("Check: cart button opens cart page", async ({
                checkoutStepTwoPage,
                page,
            }) => {
                const cartButton =
                    checkoutStepTwoPage.pageHeader.locateShoppingCartButton();
                await cartButton.click();
                await expect(page).toHaveURL(ShoppingCartPage.url);
            });

            test("Check: 'Cancel' button sends user to Inventory page", async ({
                checkoutStepTwoPage,
                page,
            }) => {
                const cancelButton = checkoutStepTwoPage.locateCancelButton();
                await cancelButton.click();

                await expect(page).toHaveURL(InventoryPage.url);
            });

            test("Check: 'Finish' button completes the order and sends user to CheckoutComplete page", async ({
                checkoutStepTwoPage,
                page,
            }) => {
                const finishButton = checkoutStepTwoPage.locateFinishButton();
                await finishButton.click();

                await expect(page).toHaveURL(CheckoutCompletePage.url);
            });
        });
    }
});

test.describe("Checkout Step Two Page: Products Data", () => {
    // parametrization: checking out with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Checking out ${numberOfProducts} product(s)`, () => {
            test.use({ numberOfProducts });

            test(`Check: number of products in the list is equal to ${numberOfProducts}`, async ({
                checkoutStepTwoPage,
            }) => {
                const cartProducts = checkoutStepTwoPage.locateCartProducts();
                await expect(cartProducts).toHaveCount(numberOfProducts);
            });

            test("Check: product structure", async ({
                checkoutStepTwoPage,
            }) => {
                const products = checkoutStepTwoPage.locateCartProducts();
                for (let i = 0; i < numberOfProducts; i++) {
                    const product = products.nth(i);
                    const productName =
                        checkoutStepTwoPage.locateCartProductName(product);
                    const productQuantity =
                        checkoutStepTwoPage.locateCartProductQuantity(product);
                    const productPrice =
                        checkoutStepTwoPage.locateCartProductPrice(product);

                    await expect(product).toBeVisible();
                    await expect(productName).toBeVisible();
                    await expect(productQuantity).toBeVisible();
                    await expect(productPrice).toBeVisible();

                    const nameString = await productName.textContent();
                    expect(nameString?.trim().length).toBeGreaterThan(0);

                    const quantityString = await productQuantity.textContent();
                    const quantity = Number(quantityString);
                    expect(quantity).toBe(1);

                    const priceString = await productPrice.textContent();
                    const price = Number(priceString?.replace("$", ""));
                    expect(price).toBeGreaterThan(0);
                }
            });
        });
    }
});

test.describe("Checkout Step Two Page: Payment Info", () => {
    // parametrization: checking out with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Checking out ${numberOfProducts} product(s)`, () => {
            test.use({ numberOfProducts });

            test("Check: payment information", async ({
                checkoutStepTwoPage,
            }) => {
                const paymentInfoLabel =
                    checkoutStepTwoPage.locatePaymentInfoLabel();
                const paymentInfo =
                    checkoutStepTwoPage.locatePaymentInfoValue();

                await expect(paymentInfoLabel).toHaveText(
                    "Payment Information:",
                );
                await expect(paymentInfo).not.toBeEmpty();
            });
        });
    }
});

test.describe("Checkout Step Two Page: Shipping Info", () => {
    // parametrization: checking out with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Checking out ${numberOfProducts} product(s)`, () => {
            test.use({ numberOfProducts });

            test("Check: shipping information", async ({
                checkoutStepTwoPage,
            }) => {
                const shippingInfoLabel =
                    checkoutStepTwoPage.locateShippingInfoLabel();
                const shippingInfoValue =
                    checkoutStepTwoPage.locateShippingInfoValue();

                await expect(shippingInfoLabel).toHaveText(
                    "Shipping Information:",
                );
                await expect(shippingInfoValue).not.toBeEmpty();
            });
        });
    }
});

test.describe("Checkout Step Two Page: Price Total Section", () => {
    // parametrization: checking out with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Checking out ${numberOfProducts} product(s)`, () => {
            test.use({ numberOfProducts });

            test("Check: price total section info", async ({
                checkoutStepTwoPage,
            }) => {
                const priceTotalLabel =
                    checkoutStepTwoPage.locatePriceTotalInfoLabel();
                const itemTotal = checkoutStepTwoPage.locateItemTotalLabel();
                const tax = checkoutStepTwoPage.locateTaxLabel();
                const total = checkoutStepTwoPage.locateTotalLabel();

                await expect(priceTotalLabel).toHaveText("Price Total");
                await expect(itemTotal).toHaveText(
                    /^Item total: \$\d+(\.\d{1,2})?$/,
                );
                await expect(tax).toHaveText(/^Tax: \$\d+(\.\d{1,2})?$/);
                await expect(total).toHaveText(/^Total: \$\d+(\.\d{1,2})?$/);
            });

            test("Check: subtotal amount computation without tax", async ({
                checkoutStepTwoPage,
            }) => {
                const itemTotal = checkoutStepTwoPage.locateItemTotalLabel();
                await expect(itemTotal).toHaveCount(1);
                await expect(itemTotal).toBeVisible();

                const itemTotalString = await itemTotal.textContent();
                const itemTotalAmount = Number(
                    itemTotalString?.match(
                        /Item total:\s*\$(\d+(\.\d+)?)/,
                    )?.[1],
                );
                expect(Number.isFinite(itemTotalAmount)).toBe(true);

                const pricesData = checkoutStepTwoPage
                    .locateCartProductPrices()
                    .allInnerTexts();

                const totalByPrices = (await pricesData).reduce(
                    (sum, price) => sum + Number(price.replace("$", "")),
                    0,
                );
                expect(Number.isFinite(totalByPrices)).toBe(true);

                expect(itemTotalAmount.toFixed(2)).toBe(
                    totalByPrices.toFixed(2),
                );
            });

            test("Check: total amount computations", async ({
                checkoutStepTwoPage,
            }) => {
                const itemTotal = checkoutStepTwoPage.locateItemTotalLabel();
                const tax = checkoutStepTwoPage.locateTaxLabel();
                const total = checkoutStepTwoPage.locateTotalLabel();

                await expect(itemTotal).toHaveCount(1);
                await expect(itemTotal).toBeVisible();

                await expect(tax).toHaveCount(1);
                await expect(tax).toBeVisible();

                await expect(total).toHaveCount(1);
                await expect(total).toBeVisible();

                const itemTotalString = await itemTotal.textContent();
                const itemTotalAmount = Number(
                    itemTotalString?.match(
                        /Item total:\s*\$(\d+(\.\d+)?)/,
                    )?.[1],
                );
                expect(Number.isFinite(itemTotalAmount)).toBe(true);

                const taxString = await tax.textContent();
                const taxAmount = Number(
                    taxString?.match(/Tax:\s*\$(\d+(\.\d+)?)/)?.[1],
                );
                expect(Number.isFinite(taxAmount)).toBe(true);

                const totalString = await total.textContent();
                const totalAmount = Number(
                    totalString?.match(/Total:\s*\$(\d+(\.\d+)?)/)?.[1],
                );
                expect(Number.isFinite(totalAmount)).toBe(true);

                const calculatedTotalAmount = itemTotalAmount + taxAmount;

                expect(totalAmount.toFixed(2)).toBe(
                    calculatedTotalAmount.toFixed(2),
                );
            });
        });
    }
});
