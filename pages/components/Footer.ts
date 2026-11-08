import { Page, Locator } from "@playwright/test";

export class Footer {
    readonly footer: Locator;

    constructor(page: Page) {
        this.footer = page.getByTestId("footer");
    }

    locateSocialMediaItems(): Locator {
        return this.footer.locator(".social > li");
    }

    locateSocialMediaX(): Locator {
        return this.footer.getByTestId("social-x");
    }

    locateSocialMediaFacebook(): Locator {
        return this.footer.getByTestId("social-facebook");
    }

    locateSocialMediaLinkedIn(): Locator {
        return this.footer.getByTestId("social-linkedin");
    }

    locateTermsOfServiceLink(): Locator {
        return this.footer.getByRole("link", {
            name: "Terms of Service",
            exact: true,
        });
    }

    locatePrivacyPolicyLink(): Locator {
        return this.footer.getByRole("link", {
            name: "Privacy Policy",
            exact: true,
        });
    }
}
