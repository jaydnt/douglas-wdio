import { expect } from "chai";
import { getBrowserUrl, getPageTitle } from "../utils/browser-manager";
import { getResourcePageDetails } from "../utils/resource-manager";
import {
  addAllureReportLog,
  addWinstonErrorLog,
  addWinstonInfoLog,
} from "../utils/helper";
import command from "../core/command";

class DashboardPage {
  private dashboardPageElementXPath = {
    acceptButton: '[data-testid="uc-accept-all-button"]',
    getTabXpath: (tabName: string) => {
      return `//a[@type='nav-heading' and text()='${tabName}']`;
    },
  };

  constructor() {}

  async assertDashboardPageURL() {
    try {
      addAllureReportLog("Asserting dashboard page url");
      addWinstonInfoLog("Asserting dashboard page url");

      const getDashboardPageDetails = await getResourcePageDetails("DASHBOARD");

      const getCurrentPageUrl = await getBrowserUrl();

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
      addAllureReportLog("Accept Cookie");
      addWinstonInfoLog("Accept Cookie");
      const acceptButtonElement = await command.getElement(
        this.dashboardPageElementXPath.acceptButton
      );

      await command.waitForDisplay(acceptButtonElement, 5000);

      const acceptButtonDisplay = await command.isDisplayed(
        acceptButtonElement
      );

      if (acceptButtonDisplay) {
        const acceptCookieClick = await command.click(acceptButtonElement);

        return acceptCookieClick;
      }
      return "";
    } catch (error) {
      const errorMessage = `Something went wrong in Accept Cookie : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      // throw new Error(errorMessage);
      return "";
    }
  }

  async assertDashboardPageTitle() {
    try {
      addAllureReportLog("Asserting dashboard page title");
      addWinstonInfoLog("Asserting dashboard page title");

      const getDashboardPageDetails = await getResourcePageDetails("DASHBOARD");

      const getCurrentPageTitle = await getPageTitle();

      const message = `Expected title is '${getDashboardPageDetails?.pageTitle}', but found '${getCurrentPageTitle}'`;
      expect(getCurrentPageTitle).to.contains(
        getDashboardPageDetails?.pageTitle,
        message
      );
      addAllureReportLog(message);
      addWinstonInfoLog(message);
      return message;
    } catch (error) {
      const errorMessage = `Something went wrong in Assert Dashboard Page Title : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async clickOnTab(tabName: string) {
    try {
      if (!tabName) {
        addAllureReportLog("Please give valid tab name");
        addWinstonErrorLog("Please give valid tab name");
        throw new Error("Please give valid tab name");
      }

      addAllureReportLog(`Click on ${tabName}`);
      addWinstonInfoLog(`Click on ${tabName}`);

      const tabElement = await command.getElement(
        this.dashboardPageElementXPath.getTabXpath(tabName)
      );

      const clickTab = await command.click(tabElement);

      return clickTab;
    } catch (error) {
      const errorMessage = `Something went wrong in CLick On Tab : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export default new DashboardPage();
