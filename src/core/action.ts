import { FrameworkError } from "../error/FrameworkError";

class Action {
  async click(element: any) {
    try {
      return await element.click();
    } catch (error) {
      throw new FrameworkError(`Element not found: ${element}`, error);
    }
  }
  async moveTo(element: any) {
    return await element.moveTo();
  }

  async waitAndClick(element: any) {
    try {
      await element.waitForDisplayed({
        timeout: 200000,
        timeoutMsg: "Element not displayed within the timeout",
      });
      return await element.click();
    } catch (error) {
      throw new FrameworkError(`Element not found: ${element}`, error);
    }
  }

  async getText(element: any) {
    try {
      return await element.getText();
    } catch (error) {
      throw new FrameworkError(`Element not found: ${element}`, error);
    }
  }

  async isDisplayed(element: any) {
    try {
      return await element.isDisplayed();
    } catch (error) {
      throw new FrameworkError(`Element not found: ${element}`, error);
    }
  }

  async waitForDisplay(element: any, milliseconds: number) {
    try {
      return await element.waitForDisplayed({
        timeout: milliseconds,
        timeoutMsg: "Element not displayed within the timeout",
      });
    } catch (error) {
      throw new FrameworkError(`Element not found: ${element}`, error);
    }
  }

  async openUrl(url: string) {
    return await browser.url(url);
  }

  async maximizeWindow() {
    return await browser.maximizeWindow();
  }

  async browserPause(milliseconds: number) {
    return await browser.pause(milliseconds);
  }
}

export default new Action();
