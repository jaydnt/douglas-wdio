class Command {
  constructor() {}

  async getElement(xPath: string) {
    return await $(xPath);
  }

  async getElements(xPath: string) {
    return await $$(xPath);
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
    return await element.waitForDisplayed({ timeout: milliseconds });
  }
}

export default new Command();
