import fs from "fs";
import appRoot from "app-root-path";
import * as dotenv from "dotenv";
import { FrameworkError } from "./src/error/FrameworkError";
const setEnv = process.env.ENV ? process.env.ENV : "prod";
dotenv.config({ path: `${appRoot}/.env.${setEnv}` });

export const config: WebdriverIO.Config = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",
  specs: ["./src/test/features/**/*.feature"],
  exclude: [],
  maxInstances: 10,

  capabilities: [
    {
      browserName: process.env.BROWSER_NAME,
    },
  ],
  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["chromedriver", "edgedriver"],
  framework: "cucumber",
  reporters: [
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true,
      },
    ],
  ],
  cucumberOpts: {
    require: ["./src/test/steps/**/*.ts"],
    backtrace: false,
    requireModule: ["tsconfig-paths/register"],
    dryRun: false,
    failFast: false,
    name: [],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 400000,
    ignoreUndefinedDefinitions: false,
  },

  onPrepare: function (config, capabilities) {
    if (fs.existsSync("./allure-results")) {
      fs.rmSync("./allure-results", { recursive: true });
    }
  },

  afterStep: async function (step, scenario, result, context) {
    if (result.error) {
      await browser.takeScreenshot();
    }
  },

  afterTest: async function (test, context, { error }) {
    if (error) {
      throw new FrameworkError(`Test failed: ${test.title}`, error);
    }
  },
};
