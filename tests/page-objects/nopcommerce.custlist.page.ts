import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page.js";
import { log } from "../helpers/logger.js";

export default class CustList extends BasePage {
    // Constructor
    constructor(page: Page) {
        super(page);
    }

    /** Elements */
    get searchFirstNameInput() {
        return this.page.getByPlaceholder("Search by first name");
    }

    get searchLastNameInput() {
        return this.page.getByPlaceholder("Search by last name");
    }

    get searchBtn() {
        return this.page.getByRole("button", { name: "Search" });
    }

    get noResultsMessage() {
        return this.page.getByText("No data available in table");
    }

    /** Page Actions */
    async goToCustomerListPage(url: string) {
        await log("info", Navigate to customer list page: ${url});
        await this.navigateTo(url);
        await expect(this.page).toHaveURL(url);
        await log("info", Customer list page loaded successfully);
    }

    async searchAndConfirmUser(firstName: string, lastName: string): Promise<boolean> {
        try {
            await log("info", Searching for customer: ${firstName} ${lastName});
            
            // Enter search criteria
            await this.typeInto(this.searchFirstNameInput, firstName);
            await this.typeInto(this.searchLastNameInput, lastName);
            
            // Click search button
            await this.click(this.searchBtn);
            
            // Wait for results
            await this.page.waitForTimeout(1000);
            
            // Check if no results message appears
            const isNotFound = await this.noResultsMessage.isVisible().catch(() => false);
            
            if (isNotFound) {
                await log("warn", Customer not found: ${firstName} ${lastName});
                return true; // Customer not found
            }
            
            await log("info", Customer found: ${firstName} ${lastName});
            return false; // Customer found
        } catch (error) {
            await log("error", Error during customer search: ${error});
            return true; // Treat as not found on error
        }
    }
}
