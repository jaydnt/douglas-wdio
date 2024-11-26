import { Given } from "@wdio/cucumber-framework";
import env from "../../config/env";
import formdata from "../../resources/formdata.json";
import {
  addAllureReportLog,
  addWinstonErrorLog,
  addWinstonInfoLog,
} from "../../utils/helper";

Given(/^User navigates to the application$/, async () => {
  console.log("Formdata: ", formdata.firstName);
  addAllureReportLog("Loading App.");
  addWinstonInfoLog("Loading App.");
  await browser.url(env.APP_URL);
  addAllureReportLog("Maximize Window.");
  addWinstonErrorLog("Maximize Window.");
  await browser.maximizeWindow();
  await browser.pause(5000);
});
