import { Page } from "@playwright/test";
import { text } from "stream/consumers";

export class ContactUsPage {

    constructor(private page: Page) {}

    // using placeholder attribute (playwright method)
    public get firstNameField() {
        return this.page.getByPlaceholder("First Name");
    }

    // using any attribute (playwright method)
    public get lastNameField() {
        return this.page.getByRole('textbox', { name: "Last name"});
    }

    // using any attribute type
    public get emailField() {
        return this.page.locator("[name='email']");
    }

    // using class attribute
    public get commentsField() {
        return this.page.locator("textarea.feedback-input");
    }

    // using any attribute (playwright method)
    public get submitButton() {
        return this.page.locator("[type=submit]");
    }

    // using role (playwright method)
    public get resetButton() {
        return this.page.getByRole('button', { name: 'Reset' });
    }

    // using role (playwright method)
    public get successLogin() {
        return this.page.getByText("Thank You for your Message!");
    }

    public get errorMessage() {
        return this.page.innerText("body");
    }
}