import { test, expect } from '@playwright/test';
import { ContactUsPage } from './dtos/ContactUsPage';
import { MyCoursesPage } from './dtos/MyCoursesPage';

import { faker } from '@faker-js/faker';

let myCoursesPage: MyCoursesPage;
let contactPage: ContactUsPage;
const fieldsAreRequiredMessage = "Error: all fields are required";
const invalidEmailValueMessage = "Error: Invalid email address";

test.beforeEach(async ({ page }) => {
    myCoursesPage = new MyCoursesPage(page);
    await myCoursesPage.openMyCoursesPage();
    contactPage = await myCoursesPage.openContactUsPage();
  });

test('Wprowadzamy wszystkie dane i sprawdzamy komunikat', async () => {
    await contactPage.firstNameField.fill(faker.person.firstName());
    await contactPage.lastNameField.fill(faker.person.lastName());
    await contactPage.emailField.fill(faker.internet.email());
    await contactPage.commentsField.fill(faker.string.alphanumeric(20));
    await contactPage.submitButton.click();
    
    await expect(contactPage.successLogin).toBeVisible();
});

test('Uzupełniamy wszystkie dane i resetujemy - weryfikujemy czy wyczyściło poprawnie', async () => {
    await contactPage.firstNameField.fill(faker.person.firstName());
    await contactPage.lastNameField.fill(faker.person.lastName());
    await contactPage.emailField.fill(faker.internet.email());
    await contactPage.commentsField.fill(faker.string.alphanumeric(20));
    await contactPage.resetButton.click();

    await expect(contactPage.firstNameField).toBeEmpty();
    await expect(contactPage.lastNameField).toBeEmpty();
    await expect(contactPage.emailField).toBeEmpty();
    await expect(contactPage.commentsField).toBeEmpty();
  });

// make this test parametrized one
test('Wprowadzamy cześć danych i próbujemy wysłać - sprawdzamy komunikat błędu', async () => {
    await contactPage.firstNameField.fill(faker.person.firstName());
    await contactPage.lastNameField.fill(faker.person.lastName());
    await contactPage.submitButton.click();

    expect(await contactPage.errorMessage).toContain(fieldsAreRequiredMessage);
  });

test('Wprowadzamy błędny email i sprawdzamy komunikat', async () => {
    await contactPage.firstNameField.fill(faker.person.firstName());
    await contactPage.lastNameField.fill(faker.person.lastName());
    await contactPage.emailField.fill(faker.string.alphanumeric(10));
    await contactPage.commentsField.fill(faker.string.alphanumeric(20));
    await contactPage.submitButton.click();

    expect(await contactPage.errorMessage).toContain(invalidEmailValueMessage);
  });