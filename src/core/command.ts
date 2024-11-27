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
}

export default new Command();
