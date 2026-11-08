import { Page } from "@playwright/test";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export class BasePage {
    protected readonly page: Page;
    readonly pageHeader: Header;
    readonly pageFooter: Footer;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = new Header(page);
        this.pageFooter = new Footer(page);
    }

    getPlaywrightPage(): Page {
        return this.page;
    }
}
