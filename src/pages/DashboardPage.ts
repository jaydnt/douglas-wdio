import { expect } from "chai";
import { getBrowserUrl } from "../utils/browser-manager";
import { getPageDetails } from "../utils/resource-manager";
import {
  addAllureReportLog,
  addWinstonErrorLog,
  addWinstonInfoLog,
} from "../utils/helper";
import command from "../core/command";

class DashboardPage {
  private dashboardPageElementXPath = {
    acceptButton: '[data-testid="uc-accept-all-button"]',
  };

  constructor() {}

  async assertDashboardPageURL() {
    try {
      // logs in report and winston
      addAllureReportLog("Asserting dashboard page url");
      addWinstonInfoLog("Asserting dashboard page url");

      // Get page details from data files
      const getDashboardPageDetails = await getPageDetails("DASHBOARD");

      // Get current page url from browser
      const getCurrentPageUrl = await getBrowserUrl();

      // asserting dashboard page
      const assertMessage = `Expected URL to be ${getDashboardPageDetails?.pageUrl}, but found ${getCurrentPageUrl}`;
      expect(getCurrentPageUrl).to.equal(
        getDashboardPageDetails?.pageUrl,
        assertMessage
      );
      addAllureReportLog(assertMessage);
      addWinstonInfoLog(assertMessage);
      return assertMessage;
    } catch (error) {
      const errorMessage = `Something went wrong in Assert Dashboard Page Url : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async acceptCookie() {
    try {
      // logs in report and winston
      addAllureReportLog("Accept Cookie");
      addWinstonInfoLog("Accept Cookie");
      const acceptButtonElement = await command.getElement(
        this.dashboardPageElementXPath.acceptButton
      );

      const acceptCookieClick = await command.click(acceptButtonElement);

      return acceptCookieClick;
    } catch (error) {
      const errorMessage = `Something went wrong in Accept Cookie : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export default new DashboardPage();
