import {
  addAllureReportLog,
  addWinstonErrorLog,
  addWinstonInfoLog,
} from "../utils/helper";
import action from "../core/action";
import { FrameworkError } from "../error/FrameworkError";

class DashboardPage {
  private dashboardPageElementXPath = {
    acceptButton: '[data-testid="uc-accept-all-button"]',
    getTabXpath: (tabName: string) => {
      return `//a[@type='nav-heading' and text()='${tabName}']`;
    },
  };

  async acceptCookie() {
    try {
      addAllureReportLog("Accept Cookie");
      addWinstonInfoLog("Accept Cookie");
      const acceptButtonElement = await $(
        this.dashboardPageElementXPath.acceptButton
      );
      await action.waitForDisplay(acceptButtonElement, 5000);
      const acceptButtonDisplay = await action.isDisplayed(acceptButtonElement);
      if (acceptButtonDisplay) {
        await action.click(acceptButtonElement);
      }
    } catch (error) {
      const errorMessage = `Something went wrong in Accept Cookie : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      return "";
    }
  }

  async clickOnTab(tabName: string) {
    try {
      if (!tabName) {
        addAllureReportLog("Please give valid tab name");
        addWinstonErrorLog("Please give valid tab name");
        throw new FrameworkError("Please give valid tab name");
      }
      addAllureReportLog(`Click on ${tabName}`);
      addWinstonInfoLog(`Click on ${tabName}`);
      const tabElement = await $(
        this.dashboardPageElementXPath.getTabXpath(tabName)
      );
      await action.waitForDisplay(tabElement, 15000);
      await action.click(tabElement);
    } catch (error) {
      const errorMessage = `Something went wrong in CLick On Tab : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new FrameworkError(errorMessage);
    }
  }
}

export default new DashboardPage();
