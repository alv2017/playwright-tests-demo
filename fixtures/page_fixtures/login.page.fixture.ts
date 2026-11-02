import { Page } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

export const loginPageFixture = async (
    { page }: { page: Page },
    use: (loginPage: LoginPage) => Promise<void>,
) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
};
