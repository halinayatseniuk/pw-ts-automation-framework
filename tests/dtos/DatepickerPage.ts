import { Page } from "@playwright/test";

export class DatepickerPage {

    constructor(private page: Page) {}

    public get dateInput() {
        return this.page.locator(".form-control");
    }

    public get dateInput2() {
        return this.page.locator(".input-group");
    }

    public get daysTable() {
        return this.page.locator(".datepicker-days");
    }

    public get monthTable() {
        return this.page.locator(".datepicker-months");
    }

    public get yearsTable() {
        return this.page.locator(".datepicker-years");
    }

    public get monthSwitch() {
        return this.daysTable.locator(".datepicker-switch");
    }

    public get yearsSwitch() {
        return this.monthTable.locator(".datepicker-switch");
    }

    public get nextYear() {
        return this.yearsTable.locator(".next");
    }

    public get previousYear() {
        return this.yearsTable.locator(".prev");
    }

    public async visibleYearOptions() {
        return (await this.yearsTable.locator("td").allInnerTexts())[0];
    }

    public async selectYear(yearToSelect : number) {
            while(!(await this.visibleYearOptions()).includes(yearToSelect.toString())) {
            const firstElement = parseInt((await this.visibleYearOptions()).split('/n')[0], 10);
            if(firstElement > yearToSelect) {
                await this.page.waitForTimeout(5000);
                await this.previousYear.click();
            } else {
                await this.page.waitForTimeout(5000);
                await this.nextYear.click();
            }
        }
        await this.yearsTable.locator(`td span.year:has-text('${yearToSelect}')`).first().click();
    }

    public async selectMonth(monthToSelect : string) {
        await this.page.waitForTimeout(5000);
        await this.monthTable.locator(`td span.month:has-text('${monthToSelect}')`).first().click();
    }

    public async selectDay(dayToSelect : number) {
        await this.daysTable.locator(`[class='day']:has-text('${dayToSelect}')`).first().click();
    }
}