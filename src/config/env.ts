import appRoot from "app-root-path";

export default {
  APP_ROOT: appRoot.path,
  ENV: process.env.ENV,
  APP_URL: process.env.APP_URL,
  BROWSER_NAME: process.env.BROWSER_NAME,
};
