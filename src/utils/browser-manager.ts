export const getBrowserUrl = async () => {
  return await browser.getUrl();
};

export const openUrl = async (url: string) => {
  return await browser.url(url);
};

export const maximizeWindow = async () => {
  return await browser.maximizeWindow();
};

export const browserPause = async (milliseconds: number) => {
  return await browser.pause(milliseconds);
};

export const getPageTitle = async () => {
  return await browser.getTitle();
};
