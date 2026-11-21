import { Page } from "@playwright/test";
import {
    CheckoutStepOnePage,
    CheckoutStepTwoPage,
} from "../../pages/CheckoutPages";

export const checkoutStepOnePageFixture = async (
    { page, numberOfProducts }: { page: Page; numberOfProducts: number },
    use: (checkoutStepOnePage: CheckoutStepOnePage) => Promise<void>,
) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page, numberOfProducts);
    await checkoutStepOnePage.navigate();
    await use(checkoutStepOnePage);
};

export const checkoutStepTwoPageFixture = async (
    { page, numberOfProducts }: { page: Page; numberOfProducts: number },
    use: (checkoutStepTwoPage: CheckoutStepTwoPage) => Promise<void>,
) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page, numberOfProducts);
    await checkoutStepTwoPage.navigate();
    await use(checkoutStepTwoPage);
};
