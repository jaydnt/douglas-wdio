import { expect } from "chai";
import { getBrowserUrl, getPageTitle } from "../utils/browser-manager";
import {
  addAllureReportLog,
  addWinstonErrorLog,
  addWinstonInfoLog,
} from "../utils/helper";
import { getResourcePageDetails } from "../utils/resource-manager";

class PerfumPage {
  constructor() {}

  async assertPerfumPageUrl() {
    try {
      // get perfum page details
      const perfumPageDetails = await getResourcePageDetails("PERFUM");

      // get current url from browser
      const currentPageUrl = await getBrowserUrl();

      // asserting perfum page
      const assertMessage = `Expected URL to be ${perfumPageDetails?.pageUrl}, but found ${currentPageUrl}`;
      expect(currentPageUrl).to.equal(
        perfumPageDetails?.pageUrl,
        assertMessage
      );
      addAllureReportLog(assertMessage);
      addWinstonInfoLog(assertMessage);
      return assertMessage;
    } catch (error) {
      const errorMessage = `Something went wrong in Assert Perfum Page Url : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async assertPerfumPageTitle() {
    try {
      // get perfum page details
      const perfumPageDetails = await getResourcePageDetails("PERFUM");

      // get current url from browser
      const currentPageTitle = await getPageTitle();

      // asserting perfum page
      const assertMessage = `Expected title is ${perfumPageDetails?.pageUrl}, but found ${currentPageTitle}`;
      expect(currentPageTitle).to.equal(
        perfumPageDetails?.pageTitle,
        assertMessage
      );
      addAllureReportLog(assertMessage);
      addWinstonInfoLog(assertMessage);
      return assertMessage;
    } catch (error) {
      const errorMessage = `Something went wrong in Assert Perfum Page Title : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export default new PerfumPage();
