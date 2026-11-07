import { test, expect } from "../../fixtures/fixtures.registry";

test.describe("Inventory Page Structure", () => {
    test("Check: inventory page title to be Swag Labs", async ({
        inventoryPage,
        page,
    }) => {
        await expect(page).toHaveURL(inventoryPage.url);
        await expect(page).toHaveTitle("Swag Labs");
    });

    test("Check: page header is Products", async ({ inventoryPage }) => {
        const secondaryHeader =
            inventoryPage.pageHeader.locateSecondaryHeader();
        await expect(secondaryHeader).toHaveText("Products");
    });

    test("Check: shopping cart link is visible", async ({ inventoryPage }) => {
        const cartLink = inventoryPage.pageHeader.locateShoppingCartButton();
        await expect(cartLink).toBeVisible();
    });

    test("Check: the number of products is greater than 0", async ({
        inventoryPage,
    }) => {
        const products = inventoryPage.locateProductItems();
        await expect(products.first()).toBeVisible();
        const productsCount = await products.count();
        expect(productsCount).toBeGreaterThan(0);
    });
});

test.describe("Product Item Structure", () => {
    test("Check product attributes: first product", async ({
        inventoryPage,
    }) => {
        const product = inventoryPage.locateFirstProduct();
        const productImage = inventoryPage.locateProductImage(product);
        const productName = inventoryPage.locateProductName(product);
        const productDescription =
            inventoryPage.locateProductDescription(product);
        const productPrice = inventoryPage.locateProductPrice(product);
        const addToCartButton =
            inventoryPage.locateProductAddToCartButton(product);

        await expect(product).toHaveCount(1);
        await expect(product).toBeVisible();

        await expect(productImage).toHaveCount(1);
        await expect(productImage).toBeVisible();

        await expect(productName).toHaveCount(1);
        await expect(productName).toBeVisible();

        await expect(productDescription).toHaveCount(1);
        await expect(productDescription).toBeVisible();

        await expect(productPrice).toHaveCount(1);
        await expect(productPrice).toBeVisible();

        await expect(addToCartButton).toHaveCount(1);
        await expect(addToCartButton).toBeVisible();
    });

    test("Check product attributes: all products in the list", async ({
        inventoryPage,
    }) => {
        let productCounter = 0;
        const numberOfProductsPerPage = 6;
        const products = inventoryPage.locateProductItems();

        await expect(products).toHaveCount(numberOfProductsPerPage);

        for (const product of await products.all()) {
            productCounter += 1;
            const productImage = inventoryPage.locateProductImage(product);
            const productName = inventoryPage.locateProductName(product);
            const productDescription =
                inventoryPage.locateProductDescription(product);
            const productPrice = inventoryPage.locateProductPrice(product);
            const productAddToCartButton =
                inventoryPage.locateProductAddToCartButton(product);

            await test.step(`Product in test: ${productCounter}`, async () => {
                await expect(product).toHaveCount(1);
                await expect(product).toBeVisible();

                await expect(productImage).toHaveCount(1);
                await expect(productImage).toBeVisible();

                await expect(productName).toHaveCount(1);
                await expect(productName).toBeVisible();

                await expect(productDescription).toHaveCount(1);
                await expect(productDescription).toBeVisible();

                await expect(productPrice).toHaveCount(1);
                await expect(productPrice).toBeVisible();

                await expect(productAddToCartButton).toHaveCount(1);
                await expect(productAddToCartButton).toBeVisible();
            });
        }
    });
});

test.describe("Adding (Removing) Products To (From) Cart", () => {
    test("Check: initially cart is empty", async ({ inventoryPage }) => {
        const cart = inventoryPage.pageHeader.locateShoppingCartButton();
        await expect(cart).toHaveAccessibleName("Cart, empty");
    });

    test("Check: add/remove first product to/from cart", async ({
        inventoryPage,
    }) => {
        const cart = inventoryPage.pageHeader.locateShoppingCartButton();
        const product = inventoryPage.locateFirstProduct();
        const productAddToCartButton =
            inventoryPage.locateProductAddToCartButton(product);
        const removeFromCartButton =
            inventoryPage.locateProductRemoveFromCartButton(product);

        await expect(product).toBeVisible();
        await expect(cart).toHaveAccessibleName("Cart, empty");

        // add product to cart
        await test.step("Adding product to cart:", async () => {
            await productAddToCartButton.click();
            await expect(removeFromCartButton).toBeVisible();
            await expect(cart).toHaveAccessibleName("Cart, 1 items");
        });

        // remove product from cart
        await test.step("Removing product from cart:", async () => {
            await removeFromCartButton.click();
            await expect(productAddToCartButton).toBeVisible();
            await expect(cart).toHaveAccessibleName("Cart, empty");
        });
    });

    test("Check: add/remove product to cart: verify every listed product", async ({
        inventoryPage,
    }) => {
        let productCounter = 0;
        const numberOfProductsPerPage = 6;
        const cart = inventoryPage.pageHeader.locateShoppingCartButton();
        const products = inventoryPage.locateProductItems();

        await expect(products).toHaveCount(numberOfProductsPerPage);

        for (const product of await products.all()) {
            productCounter += 1;
            const productAddToCartButton =
                inventoryPage.locateProductAddToCartButton(product);
            const productRemoveFromCartButton =
                inventoryPage.locateProductRemoveFromCartButton(product);

            await test.step("Initially the cart is empty:", async () => {
                await expect(cart).toHaveAccessibleName("Cart, empty");
            });

            await test.step(`Add/remove product: ${productCounter}`, async () => {
                // add product to cart
                await test.step(`Add product ${productCounter} to cart:`, async () => {
                    await productAddToCartButton.click();
                    await expect(productRemoveFromCartButton).toBeVisible();
                    await expect(cart).toHaveAccessibleName("Cart, 1 items");
                });

                // remove product from cart
                await test.step(`Remove product ${productCounter} from cart:`, async () => {
                    await productRemoveFromCartButton.click();
                    await expect(productAddToCartButton).toBeVisible();
                    await expect(cart).toHaveAccessibleName("Cart, empty");
                });
            });
        }
    });

    for (const n of [2, 3, 6]) {
        // parameterized test
        test(`Add multiple products to cart: n=${n} products`, async ({
            inventoryPage,
        }) => {
            const cart = inventoryPage.pageHeader.locateShoppingCartButton();
            const products = inventoryPage.locateProductItems();

            // all products are visible
            for (const product of await products.all()) {
                await expect(product).toBeVisible();
            }

            await test.step("Initially the cart is empty:", async () => {
                await expect(cart).toHaveAccessibleName("Cart, empty");
            });

            for (let i = 0; i < n; i++) {
                const product = inventoryPage.locateNthProduct(i);
                const productAddToCartButton =
                    inventoryPage.locateProductAddToCartButton(product);
                const productRemoveFromCartButton =
                    inventoryPage.locateProductRemoveFromCartButton(product);

                await test.step(`Add: ${i + 1} product`, async () => {
                    // check product's visibility before adding to cart
                    await expect(product).toBeVisible();

                    // adding a product
                    await productAddToCartButton.click();
                    await expect(cart).toHaveAccessibleName(
                        `Cart, ${i + 1} items`,
                    );
                    await expect(productRemoveFromCartButton).toBeVisible();
                });
            }

            // the final cart contains n products
            await expect(cart).toHaveAccessibleName(`Cart, ${n} items`);
        });
    }
});

test.describe("Product Sorting Order on the Page", () => {
    test("Check: default sorting order: products are sorted by name (A to Z)", async ({
        inventoryPage,
    }) => {
        const defaultProductOrderOption = "Name (A to Z)";
        const actualProductOrderOption =
            inventoryPage.locateActiveProductOrderOption();

        await expect(actualProductOrderOption).toBeVisible();
        await expect(actualProductOrderOption).toHaveText(
            defaultProductOrderOption,
        );
    });

    test("Check: sort products by name (A to Z)", async ({ inventoryPage }) => {
        const orderingOption = "Name (A to Z)";
        const actualOrderOption =
            inventoryPage.locateActiveProductOrderOption();
        const orderOptionSelector =
            inventoryPage.locateProductOrderOptionSelector();
        const productNames = inventoryPage.locateProductNames();

        await test.step("Select product order option:", async () => {
            await expect(orderOptionSelector).toBeVisible();
            await orderOptionSelector.selectOption({ label: orderingOption });
            await expect(actualOrderOption).toHaveText(orderingOption);
        });

        await test.step("Check if actual order matches selected order option:", async () => {
            // get actual product order
            const actualNames = await productNames.allTextContents();
            expect(actualNames.length).toBeGreaterThan(0);

            // get expected product order
            const expectedNames = [...actualNames].sort((a, b) =>
                a.localeCompare(b, "en"),
            );

            expect(actualNames).toEqual(expectedNames);
        });
    });

    test("Check: sort products by name (Z to A)", async ({ inventoryPage }) => {
        const orderingOption = "Name (Z to A)";
        const actualOrderOption =
            inventoryPage.locateActiveProductOrderOption();
        const orderOptionSelector =
            inventoryPage.locateProductOrderOptionSelector();
        const productNames = inventoryPage.locateProductNames();

        await test.step("Select product order option:", async () => {
            await expect(orderOptionSelector).toBeVisible();
            await orderOptionSelector.selectOption({ label: orderingOption });
            await expect(actualOrderOption).toHaveText(orderingOption);
        });

        await test.step("Check if actual order matches selected order option:", async () => {
            // get actual product order
            const actualNames = await productNames.allTextContents();
            expect(actualNames.length).toBeGreaterThan(0);

            // get expected product order
            const expectedNames = [...actualNames].sort((a, b) =>
                b.localeCompare(a, "en"),
            );

            expect(actualNames).toEqual(expectedNames);
        });
    });

    test("Check: sort products by price (low to high)", async ({
        inventoryPage,
    }) => {
        const orderingOption = "Price (low to high)";
        const actualOrderOption =
            inventoryPage.locateActiveProductOrderOption();
        const orderOptionSelector =
            inventoryPage.locateProductOrderOptionSelector();
        const productPrices = inventoryPage.locateProductPrices();

        await test.step("Select product order option:", async () => {
            await expect(orderOptionSelector).toBeVisible();
            await orderOptionSelector.selectOption({ label: orderingOption });
            await expect(actualOrderOption).toHaveText(orderingOption);
        });

        await test.step("Check if actual order matches selected order option:", async () => {
            // get actual prices order
            const prices = await productPrices.allTextContents();
            const actualPrices = prices.map((price) =>
                Number(price.replace("$", "")),
            );

            // get expected prices order
            const expectedPrices = [...actualPrices].sort((a, b) => a - b);

            expect(actualPrices).toEqual(expectedPrices);
        });
    });

    test("Check: sort products by price (high to low)", async ({
        inventoryPage,
    }) => {
        const orderingOption = "Price (high to low)";
        const actualOrderOption =
            inventoryPage.locateActiveProductOrderOption();
        const orderOptionSelector =
            inventoryPage.locateProductOrderOptionSelector();
        const productPrices = inventoryPage.locateProductPrices();

        await test.step("Select product order option:", async () => {
            await expect(orderOptionSelector).toBeVisible();
            await orderOptionSelector.selectOption({ label: orderingOption });
            await expect(actualOrderOption).toHaveText(orderingOption);
        });

        await test.step("Check if actual order matches selected order option:", async () => {
            // get actual prices order
            const prices = await productPrices.allTextContents();
            const actualPrices = prices.map((price) =>
                Number(price.replace("$", "")),
            );

            // get expected prices order
            const expectedPrices = [...actualPrices].sort((a, b) => b - a);

            // compare actual vs expected
            expect(actualPrices).toEqual(expectedPrices);
        });
    });
});
