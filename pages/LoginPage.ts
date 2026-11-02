import { Page, Locator } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;

    static readonly url: string = "/";
    static readonly successfulRedirectURL: string = "/inventory.html";

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.submitButton = page.getByRole("button", {
            name: "Login",
            exact: true,
        });
    }

    getErrorAlert(): Locator {
        return this.page.getByRole("alert");
    }

    async navigate(): Promise<void> {
        await this.page.goto(LoginPage.url);
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}
