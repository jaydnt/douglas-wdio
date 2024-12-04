import { Given, When, Then } from "@wdio/cucumber-framework";
import env from "../../config/env";
import { addAllureReportLog, addWinstonInfoLog } from "../../utils/helper";
import dashboardPage from "../../pages/DashboardPage";
import perfumPage from "../../pages/PerfumPage";
import assert from "../../core/assert";
import data from "../../resources/data.json";
import douglasAction from "../../core/action";

Given(/^User navigates to the application$/, async () => {
  addAllureReportLog("Loading App");
  addWinstonInfoLog("Loading App");
  await douglasAction.openUrl(env.APP_URL!);
  addAllureReportLog("Maximize Window");
  addWinstonInfoLog("Maximize Window");
  await douglasAction.maximizeWindow();
  await assert.assertURLContains(data.homePage.dashboardUrl);
  await dashboardPage.acceptCookie();
});

When("User click on {string} tab", async (tabName: string) => {
  await assert.assertTitleContains(data.homePage.title);
  await dashboardPage.clickOnTab(tabName);
});

Then("Verify user on the parfum page", async () => {
  await assert.assertURLContains(data.parfumPage.parfumPageUrl);
  await assert.assertTitleContains(data.parfumPage.title);
});

When("I select the {string} dropdown", async (dropDownName: string) => {
  await perfumPage.clickDropDown(dropDownName);
});

Then(
  "I select the {string} filter option from the {string} dropdown",
  async (filterOption: string, dropDownName: string) => {
    await perfumPage.clickOnDropDownOption(filterOption, dropDownName);
  }
);

Then(
  "Verify the {string} visible in filtter tab",
  async (filterOption: string) => {
    await perfumPage.verifyFilterOption(filterOption);
  }
);

// Then(
//   "Verify the {string} tag visibal on product list",
//   async (filterOption: string) => {
//     // await perfumPage.verifyTheFilterTagAcrossPages(filterOption);
//     await perfumPage.verifyTheFilterTagAcrossPagesV2(filterOption);
//   }
// );
