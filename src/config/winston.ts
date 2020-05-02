import winston from 'winston';
import DailyRotateFileTransport from 'winston-daily-rotate-file';
import appRoot from 'app-root-path';
import { Options } from 'morgan';
import Config from '@config/config';

class Logger {
  private logger: winston.Logger;
  private static instance: Logger;

  private winstonConfig = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5mb
      maxFiles: 5,
      colorize: true,
      humanReadableUnhandledException: true,
      prettyPrint: true,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  private constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.prettyPrint(),
        winston.format.colorize(),
      ),
      transports: [
        new DailyRotateFileTransport({
          filename: 'ts-boilerplate-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH-mm',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          dirname: 'logs',
        }),
      ],
      exitOnError: false, // do not exit on error
    });

    if (Config.ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console(this.winstonConfig.console),
      );
    }
  }

  static instantiate(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance.logger;
  }
}

export const morganOption: Options = {
  stream: {
    write: function(message: string) {
      Logger.instantiate().info(message.trim());
    },
  },
};
export default Logger.instantiate();
