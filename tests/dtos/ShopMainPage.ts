import { Page, Locator, expect } from "@playwright/test";
import { GuestCheckoutPage, GuestInfo } from './GuestCheckoutPage';

export class ShopMainPage {

    constructor(private page: Page) {}

    public get addToCartProductList() {
        return "div.pricetag [title='Add to Cart']";
    }

    public get apparelAndAccessoriesMenu() {
        return this.page.locator("nav.subnav a:has-text('Apparel & accessories')");
    }

    public get shoesMenuOption() {
        return this.page.locator("li a:has-text('Shoes')");
    }

    public get tshirtsMenuOption() {
        return this.page.locator("li a:has-text('T-shirts')");
    }

    public get productsList() {
        return this.page.locator("div.row div.col-md-3");
    }

    public get addToCart() {
        return this.productsList.locator("div.pricetag [title='Add to Cart']");
    }

    public get addToCartProductPage() {
        return this.page.locator(".cart");
    }

    public get searchField() {
        return this.page.locator("#filter_keyword");
    }

    public get productTitle() {
        return this.page.locator(".bgnone");
    }

    public get checkoutButton() {
        return this.page.locator("#cart_checkout1");
    }

    public get confirmOrderButton() {
        return this.page.locator("#checkout_btn");
    }

    public get guestCheckoutOption() {
        return this.page.locator("[value='guest']");
    }

    public get continueWithGuestCheckout() {
        return this.page.locator("button:has-text('Continue')");
    }

    public get orderIsProcessed() {
        return this.page.locator("span.maintext");
    }

    public get customerPersonalDataOnConfirmationPage() {
        return this.page.locator(".confirm_shippment_options tr td.align_left:first-child");
    }

    public get customerAddressDataOnConfirmationPage() {
        return this.page.locator(".confirm_shippment_options tr td.align_left address");
    }

    public get totalPriceInCart() {
        return this.page.locator(".dropdown .cart_total");
    }

    public get totalProductQuantityInCart() {
        return this.page.locator(".topcart .dropdown span.label-orange");
    }

    public get productPrice() {
        return this.page.locator(".productfilneprice");
    }

    public async shoesSizeRadio(size : string) {
        await this.page.locator(".input-group").getByLabel(size).check();
    }

    public filterShoesByName(name : string) : Locator {
        return this.productsList.filter({hasText : name});
    }

    public findAvailableTshirt() : Locator {
        return this.productsList.locator(this.addToCartProductList).first();
    }

    public async navigateToShoesProducts() {
        await this.apparelAndAccessoriesMenu.hover();
        await this.shoesMenuOption.click();
    }

    public async navigateToTshirtsProducts() {
        await this.apparelAndAccessoriesMenu.hover();
        await this.tshirtsMenuOption.click();
    }

    public async searchForTheProduct(productName : string) {
        await this.searchField.fill(productName);
        await this.page.keyboard.press('Enter');
        await expect(this.productTitle).toHaveText(productName);
    }

    public async addFlipFlopSandalsShoes() {
        await this.filterShoesByName("Flip Flop Sandals").locator(this.addToCartProductList).click();
        await this.shoesSizeRadio("4 UK");
        await this.addToCartProductPage.click();
    }

    public async addAnyAvailableTshirt() {
        await this.findAvailableTshirt().click();
        await this.addToCartProductPage.click();
        return this;
    }

    public async searchAndAddProductSeveralTimes(productName : string, quantity: number) : Promise<number> {
        let totalPrice = 0.00;
        for ( let i = 0; i < quantity; i++ ) {
            await this.searchForTheProduct(productName);

            const numericString = (await this.productPrice.innerText()).replace(/[^0-9.]/g, '');
            totalPrice = totalPrice + parseFloat(numericString);

            await this.addToCartProductPage.click();
        }
        return totalPrice;
    }

    public async searchAndAddProduct(productName : string) : Promise<number> {
        return await this.searchAndAddProductSeveralTimes(productName, 1);
    }

    public async goWithGuestCheckout() : Promise<GuestInfo> {
        await this.guestCheckoutOption.check();
        await this.continueWithGuestCheckout.click();
        return await new GuestCheckoutPage(this.page).fillInGuestFormWithFakerData();
    }

    public async makeYourOrder() {
        await this.checkoutButton.click();
        await this.goWithGuestCheckout();
        await this.confirmOrderButton.click();
    }
}