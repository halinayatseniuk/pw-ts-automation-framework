import { Page , expect } from "@playwright/test";
import { ContactUsPage } from './ContactUsPage';
import { DropdownsPage } from './DropdownsPage';
import { AutocompletePage } from './AutocompletePage';
import { DatepickerPage } from './DatepickerPage';
import { LoaderPage } from './LoaderPage';

export class MyCoursesPage {

    constructor(private page: Page) {}

    public get contactUsOption() {
        return this.page.locator("#contact-us");
    }

    public get dropdownsOption() {
        return this.page.locator("#dropdown-checkboxes-radiobuttons");
    }

    public get autocompleteOption() {
        return this.page.locator("#autocomplete-textfield");
    }

    public get datepickerOption() {
        return this.page.locator("#datepicker");
    }

    public get loaderOption() {
        return this.page.locator("#ajax-loader");
    }

    public autocompletePageTitle(page: Page) {
        return page.locator("h2:has-text('Autocomplete TextField')");
    }

    public async openContactUsPage() {
        const newPagePromise = this.page.context().waitForEvent('page');
        await this.contactUsOption.click();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState();
        await expect(newPage).toHaveTitle('WebDriver | Contact Us');
        return new ContactUsPage(newPage);
    }

    public async openDropdownsPage() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.dropdownsOption.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveTitle('WebDriver | Dropdown Menu(s) | Checkboxe(s) | Radio Button(s)');
        return new DropdownsPage(newPage);
    }

    public async openAutocompletePage() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.autocompleteOption.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage.locator("h2:has-text('Autocomplete TextField')")).toBeVisible();
        return new AutocompletePage(newPage);
    }

    public async openDatepickerPage() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.datepickerOption.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveTitle("WebDriver | Datepicker");
        return new DatepickerPage(newPage);
    }

    public async openLoaderPage() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.loaderOption.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveTitle("WebDriver | Ajax-Loader");
        return new LoaderPage(newPage);
    }

    public async openMyCoursesPage() {
        await this.page.goto('https://webdriveruniversity.com/');
        return await expect(this.page).toHaveTitle('WebDriverUniversity.com');
    }
}