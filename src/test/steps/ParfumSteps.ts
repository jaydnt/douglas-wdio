import { Given } from "@wdio/cucumber-framework";
import env from "../../config/env";
import { addAllureReportLog, addWinstonInfoLog } from "../../utils/helper";
import dashboardPage from "../../pages/DashboardPage";
import {
  browserPause,
  maximizeWindow,
  openUrl,
} from "../../utils/browser-manager";

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

  // pause the browser for 5 seconds
  await browserPause(5000);
});
