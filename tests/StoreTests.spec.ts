import { test, expect } from '@playwright/test';
import { ShopMainPage } from './dtos/ShopMainPage';

let shopMainPage: ShopMainPage;

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationteststore.com/');
    shopMainPage = new ShopMainPage(page);
  });

test('Napisz test dodający koszulkę oraz buty do koszyka (bez użycia wyszukiwarki), następnie przy pomocy wyszukiwarki dodaj jakiś kosmetyk i doprowadź zamówienie do finalizacji :) - sprawdź czy wszystko poszło OK', async () => {
    await shopMainPage.navigateToTshirtsProducts()
    await shopMainPage.addAnyAvailableTshirt();
    await shopMainPage.navigateToShoesProducts();
    await shopMainPage.addFlipFlopSandalsShoes();
    await shopMainPage.searchAndAddProduct("Waterproof Protective Undereye Concealer");
    await shopMainPage.makeYourOrder();

    await expect(shopMainPage.orderIsProcessed).toHaveText(" Your Order Has Been Processed!");
});

test('Sprawdź czy dane na ekranie wprowadzania adresu są walidowane poprawnie w formularzu', async () => {
    await shopMainPage.searchAndAddProduct("Pantene Pro-V Conditioner, Classic Care");

    await shopMainPage.checkoutButton.click();
    let guestInfo = await shopMainPage.goWithGuestCheckout();

    let expectedCusomerPersonalData = guestInfo.firstName + " " + guestInfo.lastName;
    expect(await shopMainPage.customerPersonalDataOnConfirmationPage.innerText()).toContain(expectedCusomerPersonalData);

    let expectedCusomerAddressData = guestInfo.street + "\n" + guestInfo.city + " " + guestInfo.region + " " + guestInfo.zipCode + "\n" + guestInfo.country;
    expect(await shopMainPage.customerAddressDataOnConfirmationPage.innerText()).toContain(expectedCusomerAddressData);
});