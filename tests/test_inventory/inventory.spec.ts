import { test, expect } from "@playwright/test";

const url = "https://www.saucedemo.com/inventory.html";

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(url);
});

test.describe("Inventory Page Structure", () => {
    test("Check inventory page title", async ({ page }) => {
        await expect(page).toHaveTitle("Swag Labs");
    });

    test("Check secondary page header to be Products", async ({ page }) => {
        const secondaryHeader = page
            .getByTestId("secondary-header")
            .getByTestId("title");
        await expect(secondaryHeader).toHaveText("Products");
    });

    test("Check shopping cart link is visible", async ({ page }) => {
        const cartLink = page.getByRole("button", { name: "Cart, empty" });
        await expect(cartLink).toBeVisible();
    });

    test("Check the number of products is greater that 0", async ({ page }) => {
        const productList = page.locator(".inventory_list");
        const products = productList.locator(".inventory_item");

        await expect(productList).toBeVisible();
        await expect(products.first()).toBeVisible();

        const productsCount = await products.count();
        expect(productsCount).toBeGreaterThan(0);

        for (let i = 0; i < productsCount; i++) {
            await test.step(`Product ${i + 1} is visible`, async () => {
                await expect(products.nth(i)).toBeVisible();
            });
        }
    });
});

test.describe("Product Item Structure", () => {
    test("Check product attributes: first product", async ({ page }) => {
        const product = page.locator(".inventory_item").first();

        const productImage = product.locator("img.inventory_item_img");
        const productName = product.locator(".inventory_item_name");
        const productDescription = product.locator(
            ".inventory_item_description",
        );
        const productPrice = product.locator(".inventory_item_price");
        const addToCartButton = product.getByRole("button", {
            name: /^add to cart$/i,
        });

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

    test("Check product attributes of every product in the list", async ({
        page,
    }) => {
        const products = page.locator(".inventory_item");
        let productCounter = 0;
        await expect(products).not.toHaveCount(0);

        for (const product of await products.all()) {
            productCounter += 1;
            const productImage = product.locator("img.inventory_item_img");
            const productName = product.locator(".inventory_item_name");
            const productDescription = product.locator(
                ".inventory_item_description",
            );
            const productPrice = product.locator(".inventory_item_price");
            const addToCartButton = product.getByRole("button", {
                name: /^add to cart$/i,
            });

            await test.step(`Product in test: ${productCounter}: ${productName}`, async () => {
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
        }
    });
});

test.describe("Adding (Removing) Products To (From) Cart", () => {
    test("Check initially cart is empty", async ({ page }) => {
        const cart = page.locator(".shopping_cart_link");
        await expect(cart).toHaveAttribute("aria-label", "Cart, empty");
    });

    test("Check add/remove first product to cart", async ({ page }) => {
        const cart = page.locator(".shopping_cart_link");
        const product = page.locator(".inventory_item").first();
        const addToCartButton = product.getByRole("button", {
            name: "Add to cart",
            exact: true,
        });
        const removeFromCartButton = product.getByRole("button", {
            name: "Remove",
            exact: true,
        });

        await expect(product).toBeVisible();
        await expect(cart).toHaveAttribute("aria-label", "Cart, empty");

        // add product to cart
        await addToCartButton.click();
        await expect(removeFromCartButton).toBeVisible();
        await expect(cart).toHaveAttribute("aria-label", "Cart, 1 items");

        // remove product from cart
        await removeFromCartButton.click();
        await expect(addToCartButton).toBeVisible();
        await expect(cart).toHaveAttribute("aria-label", "Cart, empty");
    });

    test("Check add/remove product to cart: execute for every product", async ({
        page,
    }) => {
        const cart = page.locator(".shopping_cart_link");
        const products_container = page.getByRole("main").filter({
            has: page.locator("#inventory_container"),
        });
        const products = page.locator(".inventory_item");

        await expect(products_container).toBeVisible();

        const productCount = await products.count();

        expect(productCount).toBeGreaterThan(0);

        for (let i = 0; i < productCount; i++) {
            const product = products.nth(i);
            const productName = product.locator(".inventory_item_name");
            const addToCartButton = product.getByRole("button", {
                name: "Add to cart",
                exact: true,
            });
            const removeFromCartButton = product.getByRole("button", {
                name: "Remove",
                exact: true,
            });

            // initially the cart is empty
            await expect(cart).toHaveAttribute("aria-label", "Cart, empty");

            await test.step(`Add/remove product: order: ${i + 1}: name: ${productName}`, async () => {
                // add product to cart
                await addToCartButton.click();
                await expect(removeFromCartButton).toBeVisible();
                await expect(cart).toHaveAttribute(
                    "aria-label",
                    "Cart, 1 items",
                );

                // remove product from cart
                await removeFromCartButton.click();
                await expect(addToCartButton).toBeVisible();
                await expect(cart).toHaveAttribute("aria-label", "Cart, empty");
            });
        }
    });

    for (const n of [2, 3, 6]) {
        test(`Add multiple products to cart: n=${n} products`, async ({
            page,
        }) => {
            const cart = page.locator(".shopping_cart_link");
            const products = page.locator(".inventory_item");

            // initially the cart is empty
            await expect(cart).toHaveAttribute("aria-label", "Cart, empty");

            for (let i = 0; i < n; i++) {
                const product = products.nth(i);
                const addToCartButton = product.getByRole("button", {
                    name: "Add to cart",
                    exact: true,
                });
                const removeFromCartButton = product.getByRole("button", {
                    name: "Remove",
                    exact: true,
                });

                await test.step(`Add: ${i}-th product`, async () => {
                    // check product's visibility before adding to cart
                    await expect(product).toBeVisible();

                    // adding a product
                    await addToCartButton.click();
                    await expect(cart).toHaveAttribute(
                        "aria-label",
                        `Cart, ${i + 1} items`,
                    );
                    await expect(removeFromCartButton).toBeVisible();
                });
            }

            // the final cart contains n products
            await expect(cart).toHaveAttribute(
                "aria-label",
                `Cart, ${n} items`,
            );
        });
    }
});

test.describe("Ordering Products on Page", () => {
    test("Check default ordering is Name (A to Z)", async ({ page }) => {
        const defaultOrderingOption = "Name (A to Z)";
        const productSortContainer = page.locator(".select_container");
        const actualOrdering =
            productSortContainer.getByTestId("active-option");

        await expect(productSortContainer).toBeVisible();
        await expect(actualOrdering).toHaveText(defaultOrderingOption);
    });

    test("Check: ordering Name (A to Z)", async ({ page }) => {
        const orderingOption = "Name (A to Z)";
        const productSortContainer = page.locator(".select_container");
        const actualOrdering =
            productSortContainer.getByTestId("active-option");
        const optionSelector = productSortContainer.locator("select");
        const productsContainer = page
            .getByRole("main")
            .and(page.locator("#inventory_container"));
        const productNames = productsContainer.locator(".inventory_item_name");

        // select ordering option
        await expect(optionSelector).toBeVisible();
        await optionSelector.selectOption({ label: orderingOption });
        await expect(actualOrdering).toHaveText(orderingOption);

        // get actual product order
        await expect(productsContainer).toBeVisible();
        const actualNames = await productNames.allTextContents();
        expect(actualNames.length).toBeGreaterThan(0);

        // get expected product order
        const expectedNames = [...actualNames].sort((a, b) =>
            a.localeCompare(b, "en"),
        );

        expect(actualNames).toEqual(expectedNames);
    });

    test("Check: ordering Name (Z to A)", async ({ page }) => {
        const orderingOption = "Name (Z to A)";
        const productSortContainer = page.locator(".select_container");
        const actualOrdering =
            productSortContainer.getByTestId("active-option");
        const optionSelector = productSortContainer.locator("select");
        const productsContainer = page
            .getByRole("main")
            .and(page.locator("#inventory_container"));
        const productNames = productsContainer.locator(".inventory_item_name");

        // select ordering option
        await expect(optionSelector).toBeVisible();
        await optionSelector.selectOption({ label: orderingOption });
        await expect(actualOrdering).toHaveText(orderingOption);

        // get actual product order
        await expect(productsContainer).toBeVisible();
        const actualNames = await productNames.allTextContents();
        expect(actualNames.length).toBeGreaterThan(0);

        // get expected product order
        const expectedNames = [...actualNames].sort((a, b) =>
            b.localeCompare(a, "en"),
        );

        // compare actual vs expected
        expect(actualNames).toEqual(expectedNames);
    });

    test("Check: ordering Price (low to high)", async ({ page }) => {
        const orderingOption = "Price (low to high)";
        const productSortContainer = page.locator(".select_container");
        const actualOrdering =
            productSortContainer.getByTestId("active-option");
        const optionSelector = productSortContainer.locator("select");
        const productsContainer = page
            .getByRole("main")
            .and(page.locator("#inventory_container"));
        const productPrices = productsContainer.locator(
            ".inventory_item_price",
        );

        // select ordering option
        await expect(optionSelector).toBeVisible();
        await optionSelector.selectOption({ label: orderingOption });
        await expect(actualOrdering).toHaveText(orderingOption);

        // get actual prices order
        await expect(productsContainer).toBeVisible();
        const prices = await productPrices.allTextContents();
        const actualPrices = prices.map((price) =>
            Number(price.replace("$", "")),
        );

        // get expected prices order
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        // compare actual vs expected
        expect(actualPrices).toEqual(expectedPrices);
    });

    test("Check: ordering Price (high to low)", async ({ page }) => {
        const orderingOption = "Price (high to low)";
        const productSortContainer = page.locator(".select_container");
        const actualOrdering =
            productSortContainer.getByTestId("active-option");
        const optionSelector = productSortContainer.locator("select");
        const productsContainer = page
            .getByRole("main")
            .and(page.locator("#inventory_container"));
        const productPrices = productsContainer.locator(
            ".inventory_item_price",
        );

        // select ordering option
        await expect(optionSelector).toBeVisible();
        await optionSelector.selectOption({ label: orderingOption });
        await expect(actualOrdering).toHaveText(orderingOption);

        // get actual prices order
        await expect(productsContainer).toBeVisible();
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
