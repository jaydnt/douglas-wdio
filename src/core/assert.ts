import { expect } from "chai";

class Assert {
  async assertTitle(expectedTitle: string) {
    const actualTitle = await browser.getTitle();
    expect(actualTitle).to.equal(
      expectedTitle,
      `Expected title to be '${expectedTitle}', but found '${actualTitle}'`
    );
  }

  async assertTitleContains(titlePart: string) {
    const actualTitle = await browser.getTitle();
    expect(actualTitle.toLowerCase()).to.include(
      titlePart.toLowerCase(),
      `Expected title to contain '${titlePart}', but found '${actualTitle}'`
    );
  }

  async assertURL(expectedURL: string) {
    const currentURL = await browser.getUrl();
    expect(currentURL).to.equal(
      expectedURL,
      `Expected URL to be '${expectedURL}', but found '${currentURL}'`
    );
  }

  async assertURLContains(urlPart: string) {
    const currentURL = await browser.getUrl();
    expect(currentURL).to.include(
      urlPart,
      `Expected URL to contain '${urlPart}', but found '${currentURL}'`
    );
  }

  async assertElementVisible(locator: string) {
    const element = await browser.$(locator);
    const isVisible = await element.isDisplayed();
    expect(isVisible).to.be.true;
  }

  async assertElementContainsText(locator: string, expectedText: string) {
    const element = await browser.$(locator);
    const actualText = await element.getText();
    expect(actualText).to.include(
      expectedText,
      `Expected element text to contain '${expectedText}', but found '${actualText}'`
    );
  }

  async assertElementExists(locator: string) {
    const element = await browser.$(locator);
    const isExisting = await element.isExisting();
    expect(isExisting).to.be.true;
  }

  async assertElementHidden(locator: string) {
    const element = await browser.$(locator);
    const isDisplayed = await element.isDisplayed();
    expect(isDisplayed).to.be.false;
  }
}

export default new Assert();
