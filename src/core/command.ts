class Command {
  constructor() {}

  async getElement(selector: string) {
    return await $(selector);
  }

  async getElements(selector: string) {
    return await $$(selector);
  }

  async click(element: any) {
    return await element.click();
  }
  async moveTo(element: any) {
    return await element.moveTo();
  }

  async waitAndClick(element: any) {
    await element.waitForDisplayed();
    return await element.click();
  }

  async getText(element: any) {
    return await element.getText();
  }

  async isDisplayed(element: any) {
    return await element.isDisplayed();
  }

  async waitForDisplay(element: any, milliseconds: number) {
    return await element.waitForDisplayed({
      timeout: milliseconds,
      timeoutMsg: "Element not displayed within the timeout",
    });
  }
}

export default new Command();
