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

    // public get foodSearcherOptions() {
    //     return this.page.locator("#myInputautocomplete-list").locator("div");
    // }

    // public get submitButton() {
    //     return this.foodSearcherOptions.locator("div");
    // }

    // public async selectFoodByPosition(position: number) {
    //     let optionsAmount = await this.foodSearcherOptions.count();
    //     if(position <= optionsAmount) {
    //         let option = this.foodSearcherOptions.nth(position-1);
    //         let selectedFood = await option.textContent();
    //         await option.click();
    //         return selectedFood;
    //     }
    // }
}