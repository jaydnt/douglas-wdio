import { expect } from "chai";
import {
  addAllureReportLog,
  addWinstonErrorLog,
  addWinstonInfoLog,
} from "../utils/helper";
import action from "../core/action";
import douglasAction from "../core/action";
import { FrameworkError } from "../error/FrameworkError";

class PerfumPage {
  private perfumPageElementXPath = {
    searchBox: "//input[@data-testid='typeAhead-input']",
    selectDropDown: (dropDownName: string) => {
      return `//div[@class='facet__title' and text()= '${dropDownName}']`;
    },
    dropDownOption: (filterOption: string) => {
      return `//div[@class='facet-option__label']//div[text()='${filterOption}']`;
    },
    appliedFiltterOption: "//button[@class='selected-facets__value']",
    pageInfoLocator: "//div[@data-testid='pagination-title-dropdown']",
    filterTag: (filterOption: string) => {
      return `//div[contains(@data-testid,'product-eyecatcher') and text()= '${filterOption}']`;
    },
    nextPageArrow: "//a[@data-testid='pagination-arrow-right']",
  };

  async clickDropDown(dropDownName: string) {
    try {
      addWinstonInfoLog("Move to Serach Box");
      const searchBoxElement = await $(this.perfumPageElementXPath.searchBox);
      await action.moveTo(searchBoxElement);
      const dropDownElement = await $(
        this.perfumPageElementXPath.selectDropDown(dropDownName)
      );
      // await action.waitForDisplay(dropDownElement, 200000);
      addWinstonInfoLog(`Click on ${dropDownName} Drop down`);
      await action.waitAndClick(dropDownElement);
    } catch (error) {
      const errorMessage = `Something went wrong in perfum Click DropDown  : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new FrameworkError(errorMessage);
    }
  }

  async clickOnDropDownOption(filterOption: string, dropDownName: string) {
    try {
      const dropDownOptionElement = await $(
        this.perfumPageElementXPath?.dropDownOption(filterOption)!
      );
      await action.waitForDisplay(dropDownOptionElement, 15000);
      addAllureReportLog(
        `Click on ${filterOption} from ${dropDownName} Drop down`
      );
      addWinstonInfoLog(
        `Click on ${filterOption} from ${dropDownName} Drop down`
      );
      await action.waitAndClick(dropDownOptionElement);
    } catch (error) {
      const errorMessage = `Something went wrong in Click On Dropdown Option : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new FrameworkError(errorMessage);
    }
  }

  async verifyFilterOption(filterOption: string) {
    const filterOptionElements = await browser.$$(
      this.perfumPageElementXPath.appliedFiltterOption
    );
    const filterOptionsText: string[] = [];
    for (const element of filterOptionElements) {
      const text = (await action.getText(element)).trim();
      filterOptionsText.push(text);
    }
    expect(filterOption).to.contain(
      filterOptionsText,
      `Expected filter option is ${filterOption}, but found ${filterOptionsText}`
    );
  }

  async verifyTheFilterTagAcrossPages(actualFilterText: string) {
    let currentPage = 1;
    let totalPages = 1;
    addWinstonInfoLog("Fetching pagination details");
    addAllureReportLog("Fetching pagination details");
    const pageInfo = await $(this.perfumPageElementXPath.pageInfoLocator);
    await action.waitForDisplay(pageInfo, 15000);
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
      const filters = await browser.$$(
        this.perfumPageElementXPath.filterTag(actualFilterText)
      );
      const filterTexts: string[] = [];
      for (const element of filters) {
        const filterText = await action.getText(element);
        filterTexts.push(filterText);
      }
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
        const nextPageButton = await $(
          this.perfumPageElementXPath.nextPageArrow
        );
        if (await nextPageButton.isDisplayed()) {
          await nextPageButton.click();
          await douglasAction.browserPause(4000);
          currentPage = currentPage + 1;
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
