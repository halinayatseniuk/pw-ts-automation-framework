import { Page } from "@playwright/test";
import { expect } from '@playwright/test';
import { ContactUsPage } from './ContactUsPage';

export class DropdownsPage {

    constructor(private page: Page) {}

    public get getPage() {
        return this.page;
    }

    public get languageDropdown() {
        return this.page.locator("#dropdowm-menu-1");
    }

    public get toolDropdown() {
        return this.page.locator("#dropdowm-menu-2");
    }

    public get fruitDropdown() {
        return this.page.locator("#fruit-selects");
    }

    public get firstCheckboxOption() {
        return this.getCheckboxByLabel("1");
    }

    public get secondCheckboxOption() {
        return this.getCheckboxByLabel("2");
    }

    public get thirdCheckboxOption() {
        return this.getCheckboxByLabel("3");
    }

    public get forthCheckboxOption() {
        return this.getCheckboxByLabel("4");
    }

    public get blueRadioButton() {
        return this.getRadioOptionByValue("Blue");
    }

    public get greenRadioButton() {
        return this.getRadioOptionByValue("Green");
    }

    public selectLanguageOption(title: string) {
        return this.languageDropdown.selectOption({label: title});
    }

    public selectToolOption(label: string) {
        return this.toolDropdown.selectOption({value: label.toLowerCase()});
    }

    public getCheckboxByLabel(label: string) {
        return this.page.getByLabel(`Option ${label}`);
    }

    public getRadioOptionByValue(label: string) {
        return this.page.locator(`input[value='${label.toLowerCase()}']`);
    }
}