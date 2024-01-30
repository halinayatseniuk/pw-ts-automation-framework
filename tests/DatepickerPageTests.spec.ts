import { test, expect } from '@playwright/test';
import { DatepickerPage } from '../dtos/DatepickerPage';
import { MyCoursesPage } from '../dtos/MyCoursesPage';
import dateTestData from '../utils/properties.json';

let myCoursesPage: MyCoursesPage;
let datePage: DatepickerPage;

test.beforeEach(async ({ page }) => {
  myCoursesPage = new MyCoursesPage(page);
  await myCoursesPage.openMyCoursesPage();
  datePage = await myCoursesPage.openDatepickerPage();
});

test('Automatyzujemy stronę Datepicker - wpisujemy date i sprawdzamy czy została wybrana poprawna', async () => {
  const expectedDate = "10-25-1995"

  await datePage.dateInput.click();
  await datePage.monthSwitch.click();
  await datePage.yearsSwitch.click();

  await datePage.selectYear(dateTestData.yearToSelect);
  await datePage.selectMonth(dateTestData.monthToSelect);
  await datePage.selectDay(dateTestData.dayToSelect);

  expect(await datePage.dateInput.inputValue()).toEqual(expectedDate);
});

