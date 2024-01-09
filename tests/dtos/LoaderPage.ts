import { Page } from "@playwright/test";

export class LoaderPage {

    constructor(private page: Page) {}

    public get loaderGif() {
        return this.page.locator("#loader");
    }

    public get getPage() {
        return this.page;
    }

    public get clickOnbutton() {
        return this.page.locator("[data-toggle='modal']");
    }

    public get cancelButton() {
        return this.page.locator("button:has-text('Close')");
    }
}