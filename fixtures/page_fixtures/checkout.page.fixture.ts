import { Page } from "@playwright/test";
import { CheckoutStepOnePage } from "../../pages/CheckoutPages";

export const checkoutStepOnePageFixture = async (
    { page, numberOfProducts }: { page: Page; numberOfProducts: number },
    use: (checkoutStepOnePage: CheckoutStepOnePage) => Promise<void>,
) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page, numberOfProducts);
    await checkoutStepOnePage.navigate();
    await use(checkoutStepOnePage);
};
