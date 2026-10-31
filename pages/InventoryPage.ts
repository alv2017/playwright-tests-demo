import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";

import { standardUser, standardPassword } from "../config/credentials";

export class InventoryPage {
    private readonly page: Page;

    static readonly url: string = "/inventory.html";

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(): Promise<void> {
        const loginPage = new LoginPage(this.page);
        await loginPage.navigate();
        await loginPage.login(standardUser, standardPassword);
    }
}
