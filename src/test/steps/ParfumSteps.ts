import { Given, When, Then } from "@wdio/cucumber-framework";
import env from "../../config/env";
import { addAllureReportLog, addWinstonInfoLog } from "../../utils/helper";
import dashboardPage from "../../pages/DashboardPage";
import perfumPage from "../../pages/PerfumPage";
import { maximizeWindow, openUrl } from "../../utils/browser-manager";

Given(/^User navigates to the application$/, async () => {
  // logs in report and winston
  addAllureReportLog("Loading App");
  addWinstonInfoLog("Loading App");
  await openUrl(env.APP_URL!);

  // logs in report and winston
  addAllureReportLog("Maximize Window");
  addWinstonInfoLog("Maximize Window");
  await maximizeWindow();

  // assert the dashboard page url
  await dashboardPage.assertDashboardPageURL();

  // accept cookie
  await dashboardPage.acceptCookie();
});

When("User click on {string} tab", async (tabName: string) => {
  // assert the dashboard page title
  await dashboardPage.assertDashboardPageTitle();

  // click on tab
  await dashboardPage.clickOnTab(tabName);
});

Then("Verify user on the parfum page", async () => {
  // assert the perfum page url
  await perfumPage.assertPerfumPageUrl();

  // assert the perfum page title
  await perfumPage.assertPerfumPageTitle();
});

When("I select the {string} dropdown", async (dropDownName: string) => {
  // click on drop down
  await perfumPage.clickDropDown(dropDownName);
});

Then(
  "I select the {string} filter option from the {string} dropdown",
  async (filterOption: string, dropDownName: string) => {
    // click on drop down option
    await perfumPage.clickOnDropDownOption(filterOption, dropDownName);
  }
);

Then(
  "Verify the {string} visible in filtter tab",
  async (filterOption: string) => {
    // asserting filter option applied
    await perfumPage.assertFilterOption(filterOption);
  }
);

Then(
  "Verify the {string} tag visibal on product list",
  async (filterOption: string) => {
    await perfumPage.verifyTheFilterTagAcrossPages(filterOption);
  }
);
