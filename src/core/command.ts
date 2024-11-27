class Command {
  constructor() {}

  async getElement(xPath: string) {
    return await $(xPath);
  }

  async click(element: any) {
    return await element.click();
  }
}

export default new Command();
