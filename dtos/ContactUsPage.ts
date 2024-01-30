import { Page } from "@playwright/test";

export class ContactUsPage {

    constructor(private page: Page) { }

    public get firstNameField() {
        return this.page.getByPlaceholder("First Name");
    }

    public get lastNameField() {
        return this.page.getByRole('textbox', { name: "Last name" });
    }

    public get emailField() {
        return this.page.locator("[name='email']");
    }

    public get commentsField() {
        return this.page.locator("textarea.feedback-input");
    }

    public get submitButton() {
        return this.page.locator("[type=submit]");
    }

    public get resetButton() {
        return this.page.getByRole('button', { name: 'Reset' });
    }

    public get successLogin() {
        return this.page.getByText("Thank You for your Message!");
    }

    public get errorMessage() {
        return this.page.innerText("body");
    }
}