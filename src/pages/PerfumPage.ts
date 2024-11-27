import { expect } from "chai";
import {
  browserPause,
  getBrowserUrl,
  getPageTitle,
} from "../utils/browser-manager";
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
    pageInfoLocator: "//div[@data-testid='pagination-title-dropdown']",
    filterTag: (filterOption: string) => {
      return `//div[contains(@data-testid,'product-eyecatcher') and text()='${filterOption}']`;
    },
    nextPageArrow: "//a[@data-testid='pagination-arrow-right']",
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

  async verifyTheFilterTagAcrossPages(actualFilterText: string) {
    let currentPage = 1;
    let totalPages = 1;

    addWinstonInfoLog("Fetching pagination details");
    addAllureReportLog("Fetching pagination details");
    const pageInfo = await browser.$(
      this.perfumPageElementXPath.pageInfoLocator
    );
    const pageInfoText = await pageInfo.getText();

    if (pageInfoText) {
      const match = pageInfoText.match(/Seite (\d+) von (\d+)/);
      if (match) {
        currentPage = parseInt(match[1]);
        totalPages = parseInt(match[2]);
      }
    }

    addWinstonInfoLog(`Total pages to validate: ${totalPages}`);
    addAllureReportLog(`Total pages to validate: ${totalPages}`);
    while (currentPage <= totalPages) {
      addWinstonInfoLog(
        `Validating filter tag on page ${currentPage} of ${totalPages}`
      );
      addAllureReportLog(
        `Validating filter tag on page ${currentPage} of ${totalPages}`
      );

      const filters = await command.getElements(
        this.perfumPageElementXPath.filterTag(actualFilterText)
      );

      const filterTexts: string[] = [];

      for (const element of filters) {
        const elementText = (await command.getText(element)).trim();
        filterTexts.push(elementText);
      }

      // const filterTexts: string[] = await Promise.all(
      //   filters.map(async (filter) => (await filter.getText()).trim())
      // );

      addWinstonInfoLog(
        `Verifying if the applied filters contain: '${actualFilterText}'`
      );
      addAllureReportLog(
        `Verifying if the applied filters contain: ${actualFilterText}`
      );
      expect(filterTexts).to.contain(actualFilterText.toUpperCase());
      addWinstonInfoLog("Filter verification successful on this page");
      addAllureReportLog("Filter verification successful on this page");
      if (currentPage < totalPages) {
        addWinstonInfoLog(`Navigating to page ${currentPage + 1}`);
        addAllureReportLog(`Navigating to page ${currentPage + 1}`);
        const nextPageButton = await browser.$(
          this.perfumPageElementXPath.nextPageArrow
        );
        if (await nextPageButton.isDisplayed()) {
          await nextPageButton.click();
          await browserPause(4000);
          currentPage++;
        } else {
          addWinstonInfoLog("Next page button not found, stopping pagination.");
          addAllureReportLog(
            "Next page button not found, stopping pagination."
          );
          break;
        }
      } else {
        addWinstonInfoLog("Reached the last page, stopping pagination.");
        addAllureReportLog("Reached the last page, stopping pagination.");
        break;
      }
    }
  }
}

export default new PerfumPage();
