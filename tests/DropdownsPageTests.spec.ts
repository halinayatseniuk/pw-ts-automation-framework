import { test, expect } from '@playwright/test';
import { DropdownsPage } from './dtos/DropdownsPage';
import { MyCoursesPage } from './dtos/MyCoursesPage';

let myCoursesPage: MyCoursesPage;
let dropdownsPage: DropdownsPage;

test.beforeEach(async ({ page }) => {
  myCoursesPage = new MyCoursesPage(page);
  await myCoursesPage.openMyCoursesPage();
  dropdownsPage = await myCoursesPage.openDropdownsPage();
});

test('Wybieramy wszystkie możliwe opcje z dropdownow i sprawdzamy ich wartości czy są poprawne', async () => {
  await dropdownsPage.selectLanguageOption("Python");
  await expect(dropdownsPage.getPage.getByRole("option", {name: "Python", selected: true})).not.toBeEmpty();

  await dropdownsPage.selectLanguageOption("SQL");
  await expect(dropdownsPage.getPage.getByRole("option", {name: "SQL", selected: true})).not.toBeEmpty();
    
  await dropdownsPage.selectToolOption("Maven");
  await expect(dropdownsPage.toolDropdown.getByRole("option", {selected: true})).toHaveText("Maven");
});

test('Zaznaczamy wszystkie checkboxy a następnie odznaczamy 2 i 4 - sprawdzamy czy  zostały odznaczone i zaznaczone poprawnie', async () => {
  await dropdownsPage.firstCheckboxOption.click();
  await dropdownsPage.secondCheckboxOption.click();
  await dropdownsPage.thirdCheckboxOption.click();
  await dropdownsPage.forthCheckboxOption.click();
    
  await expect(dropdownsPage.firstCheckboxOption).toBeChecked();
  await expect(dropdownsPage.secondCheckboxOption).toBeChecked();
  await expect(dropdownsPage.thirdCheckboxOption).toBeChecked({checked: false});
  await expect(dropdownsPage.forthCheckboxOption).toBeChecked();

  await dropdownsPage.secondCheckboxOption.click();
  await dropdownsPage.forthCheckboxOption.click();

  await expect(dropdownsPage.secondCheckboxOption).toBeChecked({checked: false});
  await expect(dropdownsPage.forthCheckboxOption).toBeChecked({checked: false});
});

test('Klikamy wszystkie Radio buttony po każdym kliknięciu sprawdzamy czy zaznaczył się ten który chcieliśmy', async () => {
  await dropdownsPage.greenRadioButton.check();

  await expect(dropdownsPage.greenRadioButton).toBeChecked();
  await expect(dropdownsPage.blueRadioButton).toBeChecked({checked: false});

  await dropdownsPage.blueRadioButton.check();

  await expect(dropdownsPage.greenRadioButton).toBeChecked({checked: false});
  await expect(dropdownsPage.blueRadioButton).toBeChecked();
});

test('Check that some dropdown options and radio buttons are disabled for selection', async () => {
  await expect(dropdownsPage.getRadioOptionByValue("Cabbage")).toBeDisabled();
  await expect(dropdownsPage.fruitDropdown.getByText("Orange")).toBeDisabled();
});