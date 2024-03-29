import * as winston from 'winston';
import { Config } from './config';

export const Logger = new class {

  private logger?: winston.Logger;

  constructor() {
    if (Config.debug) {
      this.logger = winston.createLogger({
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DDTHH:mm:ss.SSSS',
          }),
          winston.format.printf(info => `${info.timestamp}\t${info.level}\t${info.message}`),
        ),
        level: 'debug',
        transports: [
          new (winston.transports.File)({ filename: './debug/log.txt', options: { flags: 'w' } })
        ],
      });
    }
  }

  info(msg: string) {
    if (this.logger) {
      this.logger.info(msg);
    }
  }

  debug(msg: string) {
    if (this.logger) {
      this.logger.debug(msg);
    }
  }

  error(msg: string) {
    if (this.logger) {
      this.logger.error(msg);
    }
  }

}
