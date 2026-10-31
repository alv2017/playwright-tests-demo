import { Page } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";

export const inventoryPageFixture = async (
    { page }: { page: Page },
    use: (inventoryPage: InventoryPage) => Promise<void>,
) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await use(inventoryPage);
};
