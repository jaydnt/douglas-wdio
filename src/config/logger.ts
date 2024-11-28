import env from "./env";
import winston, { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export class LoggerService {
  private _logger: any;
  constructor() {
    const options = {
      file_error: {
        level: "error",
        filename: `${env.APP_ROOT}/src/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5 MB
        maxFiles: 5,
        colorize: false,
        format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat),
      },
      file_combined: {
        filename: `${env.APP_ROOT}/src/logs/combined.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5 MB
        maxFiles: 5,
        colorize: false,
        format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat),
      },
      console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat),
      },
    };

    this._logger = createLogger({
      transports: [
        new transports.File(options.file_error),
        new transports.File(options.file_combined),
      ],
      exitOnError: false,
    });

    if (env.ENV !== "prod") {
      this._logger.add(new transports.Console(options.console));
    }
  }

  getLogger(): winston.Logger {
    return this._logger;
  }
}
