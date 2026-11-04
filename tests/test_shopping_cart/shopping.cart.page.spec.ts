import { test, expect } from "../../fixtures/fixtures.registry";
import { InventoryPage } from "../../pages/InventoryPage";
import { CheckoutStepOnePage } from "../../pages/CheckoutPages";

const productsCount = [0, 1, 6];

test.describe("Shopping Cart Page Structure", () => {
    // parameterization: carts with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Cart with ${numberOfProducts}:`, () => {
            test.use({ numberOfProducts });

            test(`Check shopping Cart with ${numberOfProducts}:`, async ({
                shoppingCartPage,
            }) => {
                await test.step("Check: page header is 'Your Cart'", async () => {
                    const secondaryHeader =
                        shoppingCartPage.locateSecondaryHeader();

                    await expect(secondaryHeader).toHaveText("Your Cart");
                });

                await test.step("Check: cart list is present", async () => {
                    const cartList = shoppingCartPage.locateCartList();

                    await expect(cartList).toHaveCount(1);
                    await expect(cartList).toBeVisible();
                });

                await test.step("Check: page contains 'Continue Shopping' button", async () => {
                    const continueShoppingButton =
                        shoppingCartPage.locateContinueShoppingButton();

                    await expect(continueShoppingButton).toHaveCount(1);
                    await expect(continueShoppingButton).toBeVisible();
                });

                await test.step("Check: page contains 'Checkout' button", async () => {
                    const checkoutButton =
                        shoppingCartPage.locateCheckoutButton();

                    await expect(checkoutButton).toHaveCount(1);
                    await expect(checkoutButton).toBeVisible();
                });
            });
        });
    }
});

test.describe("Shopping Cart Page Navigation", () => {
    // parameterization: carts with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Cart with ${numberOfProducts} products`, () => {
            test.use({ numberOfProducts });

            test("Check: 'Continue Shopping' sends user to Inventory Page", async ({
                shoppingCartPage,
                page,
            }) => {
                const continueShoppingButton =
                    shoppingCartPage.locateContinueShoppingButton();

                await expect(continueShoppingButton).toBeEnabled();

                await continueShoppingButton.click();

                await expect(page).toHaveURL(InventoryPage.url);
            });

            // run this test only when the cart is non-empty
            if (numberOfProducts > 0) {
                test("Check: 'Checkout' button sends user to Checkout Page", async ({
                    shoppingCartPage,
                    page,
                }) => {
                    const checkoutButton =
                        shoppingCartPage.locateCheckoutButton();

                    await expect(checkoutButton).toBeEnabled();

                    await checkoutButton.click();

                    await expect(page).toHaveURL(CheckoutStepOnePage.url);
                });
            }
            // run this test only if the cart is empty
            if (numberOfProducts === 0) {
                test("Check: if cart is empty the 'Checkout' button must be disabled", async ({
                    shoppingCartPage,
                }) => {
                    test.fail(
                        true,
                        "Known defect: Checkout is enabled when shopping cart is empty",
                    );
                    const checkoutButton =
                        shoppingCartPage.locateCheckoutButton();

                    await expect(checkoutButton).toBeDisabled();
                });
            }
        });
    }
});

test.describe("Number of Products in the Cart", () => {
    // parameterization: carts with different number of products
    for (const numberOfProducts of productsCount) {
        test.describe(`Cart with ${numberOfProducts} products`, () => {
            test.use({ numberOfProducts });

            test("Check: number of products in the cart", async ({
                shoppingCartPage,
            }) => {
                const products = shoppingCartPage.locateCartItems();

                await expect(products).toHaveCount(numberOfProducts);
            });
        });
    }
});

test.describe("Removing products from cart", () => {
    test.describe("Cart is empty", () => {
        test.use({ numberOfProducts: 0 });

        test("Check: there is no product to remove", async ({
            shoppingCartPage,
        }) => {
            const products = shoppingCartPage.locateCartItems();
            await expect(products).toHaveCount(0);
        });
    });

    test.describe("There is one product in the cart", () => {
        test.use({ numberOfProducts: 1 });

        test("After removing a product there is no product left in the cart", async ({
            shoppingCartPage,
        }) => {
            const products = shoppingCartPage.locateCartItems();
            const product = products.first();
            const productRemoveButton =
                shoppingCartPage.locateItemRemoveButton(product);

            // before removal
            await expect(product).toHaveCount(1);

            // removing product
            await productRemoveButton.click();

            // after removal
            await expect(product).toHaveCount(0);
        });
    });

    test.describe("There are six products in the cart", () => {
        const productsCount = 6;
        test.use({ numberOfProducts: productsCount });

        for (let i = 0; i < productsCount; i++) {
            test(`Check: removing product ${i + 1} leaves five products in the cart`, async ({
                shoppingCartPage,
            }) => {
                const numberOfProductsInCart = productsCount;
                const products = shoppingCartPage.locateCartItems();
                const product = products.nth(i);
                const productRemoveButton =
                    shoppingCartPage.locateItemRemoveButton(product);
                const productName = await shoppingCartPage
                    .locateItemName(product)
                    .innerText();

                // before removal
                await expect(products).toHaveCount(numberOfProductsInCart);
                await expect(
                    products.filter({ hasText: productName }),
                ).toHaveCount(1);

                // removing one product
                await productRemoveButton.click();

                // after removal
                await expect(products).toHaveCount(numberOfProductsInCart - 1);
                await expect(
                    products.filter({ hasText: productName }),
                ).toHaveCount(0);
            });
        }

        test("Check: removing products one by one", async ({
            shoppingCartPage,
        }) => {
            for (let i = 0; i < productsCount; i++) {
                const numberOfProductsInCart = productsCount - i;

                await test.step(`Removing one product out of ${numberOfProductsInCart}`, async () => {
                    const products = shoppingCartPage.locateCartItems();
                    const product = products.first();
                    const productRemoveButton =
                        shoppingCartPage.locateItemRemoveButton(product);
                    const productName = await shoppingCartPage
                        .locateItemName(product)
                        .innerText();

                    // before removal
                    await expect(products).toHaveCount(numberOfProductsInCart);
                    await expect(
                        products.filter({ hasText: productName }),
                    ).toHaveCount(1);

                    // removing product
                    await productRemoveButton.click();

                    // after removal
                    await expect(products).toHaveCount(
                        numberOfProductsInCart - 1,
                    );
                    await expect(
                        products.filter({ hasText: productName }),
                    ).toHaveCount(0);
                });
            }
        });
    });
});
