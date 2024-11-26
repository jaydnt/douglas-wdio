import report from "@wdio/allure-reporter";
import { LoggerService } from "../config/logger";

export const addAllureReportLog = (log: string) => {
  report.addStep(`STEP: ${log}`);
};

export const addWinstonInfoLog = (log: string) => {
  const loggerService = new LoggerService();
  loggerService.getLogger().info(log);
};

export const addWinstonErrorLog = (log: string) => {
  const loggerService = new LoggerService();
  loggerService.getLogger().error(log);
};
