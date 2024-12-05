import { expect } from "chai";
import {
  addAllureReportLog,
  addWinstonErrorLog,
  addWinstonInfoLog,
} from "../utils/helper";
import action from "../core/action";
import assert from "../core/assert";
import douglasAction from "../core/action";
import { FrameworkError } from "../error/FrameworkError";

class PerfumPage {
  private perfumPageElementXPath = {
    searchBox: "//a[@class='link link--text douglas-logo__link']",
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
      const dropDownElement = await $(
        this.perfumPageElementXPath.selectDropDown(dropDownName)
      );
      await action.moveTo(dropDownElement);
      await action.waitForClickable(dropDownElement, 20000);
      await action.click(dropDownElement);
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
      await action.isDisplayed(dropDownOptionElement);
      addAllureReportLog(
        `Click on ${filterOption} from ${dropDownName} Drop down`
      );
      addWinstonInfoLog(
        `Click on ${filterOption} from ${dropDownName} Drop down`
      );
      await action.click(dropDownOptionElement);
    } catch (error) {
      const errorMessage = `Something went wrong in Click On Dropdown Option : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new FrameworkError(errorMessage);
    }
  }

  async verifyFilterOption(filterOption: string) {
    try {
      const filterOptionElements = await browser.$$(
        this.perfumPageElementXPath.appliedFiltterOption
      );
      const filterOptionsText: string[] = [];
      for (const element of filterOptionElements) {
        await action.isDisplayed(element);
        const text = (await action.getText(element)).trim();
        filterOptionsText.push(text);
      }
      await assert.assertTextContain(
        filterOption,
        filterOptionsText,
        `Expected filter option is ${filterOption}, but found ${filterOptionsText}`
      );
    } catch (error) {
      const errorMessage = `Something went wrong in Click On Dropdown Option : ${error}`;
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new FrameworkError(errorMessage);
    }
  }

  async verifyTheFilterTagAcrossPages(actualFilterText: string) {
    try {
      let currentPage = 1;
      let totalPage = 0;

      // Fetch total pages
      const pageInfo = await $(this.perfumPageElementXPath.pageInfoLocator);
      await action.isDisplayed(pageInfo);
      const pageInfoText = await action.getText(pageInfo);
      if (pageInfoText) {
        const match = pageInfoText.match(/Seite (\d+) von (\d+)/);
        if (match) {
          totalPage = Number(match[2]);
        }
      }
      console.log("Total pages:", totalPage);

      while (currentPage <= totalPage) {
        const filters = await browser.$$(
          this.perfumPageElementXPath.filterTag(actualFilterText)
        );
        console.log(`Page ${currentPage}: Found ${filters.length} filters`);
        const filterTexts: string[] = [];
        for (const element of filters) {
          await action.isDisplayed(element);
          const filterText = await action.getText(element);
          filterTexts.push(filterText);
        }
        await assert.assertTextContain(
          actualFilterText.toUpperCase(),
          filterTexts,
          `Expected filter option is ${actualFilterText.toUpperCase()}, but found ${filterTexts}`
        );

        if (currentPage < totalPage) {
          const nextPageButton = await $(
            this.perfumPageElementXPath.nextPageArrow
          );
          await action.scrollIntoView(nextPageButton);
          const isClickable = await action.isClickable(nextPageButton);
          if (!isClickable) {
            throw new Error(
              `Next page button is not clickable on page ${currentPage}`
            );
          }
          await action.click(nextPageButton);
          await action.waitUntillElementTextVisibal(
            pageInfo,
            `Seite ${currentPage + 1} von`,
            10000,
            `Page indicator did not update to page ${currentPage + 1}`
          );
          currentPage = currentPage + 1;
          await action.waitForPageToLoad();
        } else {
          break;
        }
      }
    } catch (error) {
      const errorMessage = `Something went wrong in Verify The Filter Tag Across Pages V2: ${error.message}`;
      console.error(errorMessage);
      addAllureReportLog(errorMessage);
      addWinstonErrorLog(errorMessage);
      throw new FrameworkError(errorMessage);
    }
  }
}

export default new PerfumPage();
