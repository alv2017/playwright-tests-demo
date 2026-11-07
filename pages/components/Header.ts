import { Page, Locator } from "@playwright/test";

export class Header {
    readonly header: Locator;

    constructor(page: Page) {
        this.header = page.getByTestId("header-container");
    }

    locatePrimaryHeader(): Locator {
        return this.header.getByTestId("primary-header");
    }

    locateAppLogo(): Locator {
        return this.header.locator(".app-logo");
    }

    locateShoppingCartButton(): Locator {
        return this.header.getByTestId("shopping-cart-link");
    }

    locateShoppingCartBadge(): Locator {
        return this.header.getByTestId("shopping-cart-badge");
    }

    locateOpenMenuButton(): Locator {
        return this.header.getByRole("button", {
            name: "Open Menu",
            exact: true,
        });
    }

    locateCloseMenuButton(): Locator {
        return this.header.getByRole("button", {
            name: "Close Menu",
            exact: true,
        });
    }

    locateNavigationMenu(): Locator {
        return this.header.getByRole("navigation");
    }

    locateNavigationItems(): Locator {
        return this.header.locator(".bm-item.menu-item");
    }

    locateNavigationItemAllItems(): Locator {
        return this.header.getByTestId("inventory-sidebar-link");
    }

    locateNavigationItemDynamicCatalog(): Locator {
        return this.header.getByTestId("dynamic-catalog-sidebar-link");
    }

    locateNavigationItemAbout(): Locator {
        return this.header.getByTestId("about-sidebar-link");
    }

    locateNavigationLogout(): Locator {
        return this.header.getByTestId("logout-sidebar-link");
    }

    locateNavigationItemResetAppState(): Locator {
        return this.header.getByTestId("reset-sidebar-link");
    }

    locateSecondaryHeader(): Locator {
        return this.header.getByTestId("secondary-header").getByTestId("title");
    }
}
