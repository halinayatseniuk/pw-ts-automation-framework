import { test, expect } from '@playwright/test';
import { DatepickerPage } from './dtos/DatepickerPage';
import { MyCoursesPage } from './dtos/MyCoursesPage';

import { faker } from '@faker-js/faker';

let myCoursesPage: MyCoursesPage;
let datePage: DatepickerPage;

test.beforeEach(async ({ page }) => {
    myCoursesPage = new MyCoursesPage(page);
    await myCoursesPage.openMyCoursesPage();
    datePage = await myCoursesPage.openDatepickerPage();
  });

test('Automatyzujemy stronę Datepicker - wpisujemy date i sprawdzamy czy została wybrana poprawna', async () => {
    const yearToSelect = 1995;
    const monthToSelect = "Oct";
    const dayToSelect = 25;
    const expectedDate = "10-25-1995"

    await datePage.dateInput.click();
    await datePage.monthSwitch.click();
    await datePage.yearsSwitch.click();

    await datePage.selectYear(yearToSelect);
    await datePage.selectMonth(monthToSelect);
    await datePage.selectDay(dayToSelect);

    expect(await datePage.dateInput.inputValue()).toEqual(expectedDate);
  });

