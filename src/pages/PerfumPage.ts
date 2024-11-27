import { expect } from "chai";
import { getBrowserUrl, getPageTitle } from "../utils/browser-manager";
import {
  addAllureReportLog,
  addWinstonErrorLog,
  addWinstonInfoLog,
} from "../utils/helper";
import { getResourcePageDetails } from "../utils/resource-manager";
import command from "../core/command";

class PerfumPage {
  private perfumPageElementXPath = {
    searchBox: "//input[@data-testid='typeAhead-input']",
    getDropDownXPath: (dropDownName: string) => {
      return `//div[@class='facet__title' and text()= '${dropDownName}']`;
    },
    getDropDownOptionXPath: (dropDownName: string, filterOption: string) => {
      if (dropDownName === "Highlights") {
        return `//div[@class='facet-option__label']//div[text()='${filterOption}']`;
      }
    },
    appliedFiltterOption: "//button[@class='selected-facets__value']",
  };
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
      const assertMessage = `Expected title is ${perfumPageDetails?.pageTitle}, but found ${currentPageTitle}`;
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

  async clickDropDown(dropDownName: string) {
    try {
      addAllureReportLog("Move to Serach Box");
      addWinstonInfoLog("Move to Serach Box");
      // get search box element
      const searchBoxElement = await command.getElement(
        this.perfumPageElementXPath.searchBox
      );

      // move to search box
      const moveTillSearchBox = await command.moveTo(searchBoxElement);

      // get drop down element
      const dropDownElement = await command.getElement(
        this.perfumPageElementXPath.getDropDownXPath(dropDownName)
      );

      addAllureReportLog(`Click on ${dropDownName} Drop down`);
      addWinstonInfoLog(`Click on ${dropDownName} Drop down`);
      // wait and click on drop down
      const clickDropDown = await command.waitAndClick(dropDownElement);

      return clickDropDown;
    } catch (error) {
      const errorMessage = `Something went wrong in perfum Click DropDown  : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async clickOnDropDownOption(filterOption: string, dropDownName: string) {
    try {
      // get drop down option element
      const dropDownOptionElement = await command.getElement(
        this.perfumPageElementXPath?.getDropDownOptionXPath(
          dropDownName,
          filterOption
        )!
      );

      addAllureReportLog(
        `Click on ${filterOption} from ${dropDownName} Drop down`
      );
      addWinstonInfoLog(
        `Click on ${filterOption} from ${dropDownName} Drop down`
      );
      // click on option
      const clickOnOption = await command.waitAndClick(dropDownOptionElement);

      return clickOnOption;
    } catch (error) {
      const errorMessage = `Something went wrong in Click On Dropdown Option : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async assertFilterOption(filterOption: string) {
    try {
      addAllureReportLog(`Asserting Filter option ${filterOption}`);
      addWinstonInfoLog(`Asserting Filter option ${filterOption}`);
      // get Filter options element
      const filterOptionElements = await command.getElements(
        this.perfumPageElementXPath.appliedFiltterOption
      );

      const filterOptionsText: string[] = [];

      for (const element of filterOptionElements) {
        const elementText = (await command.getText(element)).trim();
        filterOptionsText.push(elementText);
      }

      const assertMessage = `Expected filter option is ${filterOption}, but found ${filterOptionsText}`;
      expect(filterOption).to.contain(filterOptionsText, assertMessage);
      addAllureReportLog(assertMessage);
      addWinstonInfoLog(assertMessage);

      return assertMessage;
    } catch (error) {
      const errorMessage = `Something went wrong in Assert Filter Option : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export default new PerfumPage();
