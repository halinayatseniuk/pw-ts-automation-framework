import { Page } from "@playwright/test";

export class AutocompletePage {

    constructor(private page: Page) {}

    public get foodSearcher() {
        return this.page.getByPlaceholder("Food Item");
    }

    public get foodSearcherOptions() {
        return this.page.locator("#myInputautocomplete-list").locator("div");
    }

    public get submitButton() {
        return this.foodSearcherOptions.locator("div");
    }

    public async selectFoodByPosition(position: number) {
        let optionsAmount = await this.foodSearcherOptions.count();
        if(position <= optionsAmount) {
            let option = this.foodSearcherOptions.nth(position-1);
            let selectedFood = await option.textContent();
            await option.click();
            return selectedFood;
        }
    }
}