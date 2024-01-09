import { test, expect } from '@playwright/test';
import { AutocompletePage } from './dtos/AutocompletePage';
import { MyCoursesPage } from './dtos/MyCoursesPage';

let myCoursesPage: MyCoursesPage;
let autocompletePage: AutocompletePage;

test.beforeEach(async ({ page }) => {
    myCoursesPage = new MyCoursesPage(page);
    await myCoursesPage.openMyCoursesPage();
    autocompletePage = await myCoursesPage.openAutocompletePage();
  });

test('Automatyzujemy stronę Autocomplete TextField - wpisujemy 3 pierwsze znaki i wybieramy 2 element z listy podpowiadanej np. ("chi")', async () => {
    await autocompletePage.foodSearcher.pressSequentially("chi", { delay : 100 });
    await autocompletePage.foodSearcherOptions.first().waitFor();

    let selectedFoodName = await autocompletePage.selectFoodByPosition(2);
    expect(selectedFoodName).toBeDefined();
    expect(await autocompletePage.foodSearcher.inputValue()).toEqual(selectedFoodName);
});