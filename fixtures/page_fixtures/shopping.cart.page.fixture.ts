import { Page } from "@playwright/test";
import { ShoppingCartPage } from "../../pages/ShoppingCartPage";

export const shoppingCartPageFixture = async (
    { page, numberOfProducts }: { page: Page; numberOfProducts: number },
    use: (shoppingCartPage: ShoppingCartPage) => Promise<void>,
) => {
    const shoppingCartPage = new ShoppingCartPage(page, numberOfProducts);
    await shoppingCartPage.navigate();
    await use(shoppingCartPage);
};
