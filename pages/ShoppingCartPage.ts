import { Page, Locator } from "@playwright/test";
import { InventoryPage } from "./InventoryPage";
import { BasePage } from "./BasePage";

class ShoppingCartPageBase extends BasePage {
    static readonly url: string = "/cart.html";
    static readonly maxNumberOfProductsInCart: number = 6;
    numberOfProducts: number;

    constructor(page: Page, numberOfProducts: number = 0) {
        super(page);

        if (numberOfProducts < 0) {
            throw new Error(
                "The number of products in the cart must be greater than 0",
            );
        }

        if (!Number.isInteger(numberOfProducts)) {
            throw new Error(
                "The number of products in the cart must be an integer",
            );
        }

        if (numberOfProducts > ShoppingCartPageBase.maxNumberOfProductsInCart) {
            throw new Error(
                "The maximum number of products in the cart exceeded",
            );
        }

        this.numberOfProducts = numberOfProducts;
    }

    get url(): string {
        return ShoppingCartPageBase.url;
    }

    async navigate(): Promise<void> {
        const inventoryPage = new InventoryPage(this.page);
        await inventoryPage.navigate();

        for (let i = 0; i < this.numberOfProducts; i++) {
            try {
                await inventoryPage.addProductToCart();
            } catch (error) {
                throw new Error(
                    "Unable to add required number of products to cart",
                    { cause: error },
                );
            }
        }

        await inventoryPage.pageHeader.locateShoppingCartButton().click();
    }
}

export class ShoppingCartPage extends ShoppingCartPageBase {
    locateContinueShoppingButton(): Locator {
        return this.page.getByRole("button", { name: "Continue Shopping" });
    }

    locateCheckoutButton(): Locator {
        return this.page.getByRole("button", { name: "Checkout" });
    }

    locateCartList(): Locator {
        return this.page.getByTestId("cart-list");
    }

    locateCartItems(): Locator {
        return this.page.getByTestId("inventory-item");
    }

    locateItemNames(): Locator {
        return this.page.getByTestId("inventory-item-name");
    }

    locateItemRemoveButton(cartItem: Locator): Locator {
        return cartItem.getByRole("button", { name: "Remove", exact: true });
    }

    locateItemName(cartItem: Locator): Locator {
        return cartItem.getByTestId("inventory-item-name");
    }
}
