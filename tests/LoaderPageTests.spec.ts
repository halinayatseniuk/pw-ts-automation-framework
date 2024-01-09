import { test, expect } from '@playwright/test';
import { LoaderPage } from './dtos/LoaderPage';
import { MyCoursesPage } from './dtos/MyCoursesPage';

let myCoursesPage: MyCoursesPage;
let loaderPage: LoaderPage;

test.beforeEach(async ({ page }) => {
    myCoursesPage = new MyCoursesPage(page);
    await myCoursesPage.openMyCoursesPage();
    loaderPage = await myCoursesPage.openLoaderPage();
  });

test('Automatyzujemy stronę Ajax-Loader - czekamy aż strona się załaduje(bez statycznych waitow) i klikamy guzik', async () => {
    await expect(loaderPage.loaderGif).not.toBeVisible({timeout : 5000});
    await loaderPage.clickOnbutton.click();
    await loaderPage.cancelButton.click();
});