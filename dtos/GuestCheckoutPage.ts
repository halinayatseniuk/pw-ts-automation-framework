import { Page } from "@playwright/test";
import { faker } from '@faker-js/faker';

export interface GuestInfo {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    region: string;
    country: string;
    zipCode: string;
}

export class GuestCheckoutPage {

    constructor(private page: Page) { }

    public get firstNameField() {
        return this.page.locator("#guestFrm_firstname");
    }

    public get lastNameField() {
        return this.page.locator("#guestFrm_lastname");
    }

    public get emailField() {
        return this.page.locator("#guestFrm_email");
    }

    public get companyField() {
        return this.page.locator("#guestFrm_company");
    }

    public get firstAddressField() {
        return this.page.locator("#guestFrm_address_1");
    }

    public get cityField() {
        return this.page.locator("#guestFrm_city");
    }

    public get countryDropdown() {
        return this.page.locator("#guestFrm_country_id");
    }

    public get countryDropdownOptions() {
        return this.page.locator("#guestFrm_country_id option");
    }

    public get regionDropdown() {
        return this.page.locator("#guestFrm_zone_id");
    }

    public get regionDropdownOptions() {
        return this.page.locator("#guestFrm_zone_id option");
    }

    public get postCodeField() {
        return this.page.locator("#guestFrm_postcode");
    }

    public get continueButton() {
        return this.page.locator("button:has-text('Continue')");
    }

    public async selectRandomCountry(): Promise<string> {
        let countryIndex = faker.number.int({ min: 1, max: await this.countryDropdownOptions.count() - 1 });
        await this.countryDropdown.click();
        await this.countryDropdown.selectOption({ index: countryIndex });
        return await this.countryDropdown.locator(`option:nth-child(${countryIndex + 1})`).innerText();
    }

    public async selectRandomRegion(): Promise<string> {
        await this.page.waitForTimeout(1000);
        let regionIndex = faker.number.int({ min: 1, max: await this.regionDropdownOptions.count() - 1 });
        await this.regionDropdown.click();
        await this.regionDropdown.selectOption({ index: regionIndex });
        return await this.regionDropdown.locator(`option:nth-child(${regionIndex + 1})`).innerText();
    }

    public async fillInGuestFormWithFakerData(): Promise<GuestInfo> {
        let selectedCountry = await this.selectRandomCountry();
        let selectedRegion = await this.selectRandomRegion();

        let enteredInfo: GuestInfo = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            region: selectedRegion,
            country: selectedCountry,
            zipCode: faker.location.zipCode()
        };

        await this.firstNameField.fill(enteredInfo.firstName);
        await this.lastNameField.fill(enteredInfo.lastName);
        await this.emailField.fill(enteredInfo.email);
        await this.companyField.fill(faker.company.name());
        await this.firstAddressField.fill(enteredInfo.street);
        await this.cityField.fill(enteredInfo.city);
        await this.postCodeField.fill(enteredInfo.zipCode);

        await this.continueButton.click();

        return enteredInfo;
    }
}