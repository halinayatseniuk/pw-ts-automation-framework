import { test, expect } from '@playwright/test';
import { ErrorMessages } from '../enums/ErrorMessages';
import { ContactUsPage } from '../dtos/ContactUsPage';
import { MyCoursesPage } from '../dtos/MyCoursesPage';
import { faker } from '@faker-js/faker';

let myCoursesPage: MyCoursesPage;
let contactPage: ContactUsPage;

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

[
  {
    testName: "with empty first name",
    firstName: "",
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    comment: faker.string.alphanumeric()
  },
  {
    testName: "with empty second name",
    firstName: faker.person.firstName(),
    lastName: "",
    email: faker.internet.email(),
    comment: faker.string.alphanumeric()
  },
  {
    testName: "with empty email",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: "",
    comment: faker.string.alphanumeric()
  },
  {
    testName: "with empty comments",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    comment: ""
  }
]
  .forEach(testData => {
    test(`Wprowadzamy cześć danych i próbujemy wysłać - sprawdzamy komunikat błędu ${testData.testName}`, async () => {
      await contactPage.firstNameField.fill(testData.firstName);
      await contactPage.lastNameField.fill(testData.lastName);
      await contactPage.emailField.fill(testData.email);
      await contactPage.commentsField.fill(testData.comment);
      await contactPage.submitButton.click();

      expect(await contactPage.errorMessage).toContain(ErrorMessages.FieldsAreRequired);
    });
  })

test('Wprowadzamy błędny email i sprawdzamy komunikat', async () => {
  await contactPage.firstNameField.fill(faker.person.firstName());
  await contactPage.lastNameField.fill(faker.person.lastName());
  await contactPage.emailField.fill(faker.string.alphanumeric(10));
  await contactPage.commentsField.fill(faker.string.alphanumeric(20));
  await contactPage.submitButton.click();

  expect(await contactPage.errorMessage).toContain(ErrorMessages.InvalidEmailValue);
});