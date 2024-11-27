import { expect } from "chai";
import { getBrowserUrl } from "../utils/browser-manager";
import { getPageDetails } from "../utils/resource-manager";

class DashboardPage {
  constructor() {}

  async assertDashboardPageURL() {
    const getDashboardPageDetails = await getPageDetails("DASHBOARD");
    const getCurrentPageUrl = await getBrowserUrl();
    expect(getCurrentPageUrl).to.equal(
      getDashboardPageDetails?.pageUrl,
      `Expected URL to be ${getDashboardPageDetails?.pageUrl}, but found ${getCurrentPageUrl}`
    );
  }
}

export default new DashboardPage();
