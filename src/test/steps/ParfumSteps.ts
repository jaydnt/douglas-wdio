import { Given } from "@wdio/cucumber-framework";
import env from "../../config/env";
import {
  addAllureReportLog,
  addWinstonErrorLog,
  addWinstonInfoLog,
} from "../../utils/helper";
import dashboardPage from "../../pages/DashboardPage";

Given(/^User navigates to the application$/, async () => {
  // logs in report and winston
  addAllureReportLog("Loading App");
  addWinstonInfoLog("Loading App");
  await browser.url(env.APP_URL);

  // logs in report and winston
  addAllureReportLog("Maximize Window");
  addWinstonInfoLog("Maximize Window");
  await browser.maximizeWindow();

  // assert the dashboard page url
  await dashboardPage.assertDashboardPageURL();
});
