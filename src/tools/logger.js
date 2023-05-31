import { createLogger, format, transports } from 'winston';
import { settingsNumber } from './arguments.js';

const hasSetting =
  typeof settingsNumber === 'number' && !Number.isNaN(settingsNumber);

const consoleFormat = format.printf(({ ms, message, timestamp }) => {
  if (hasSetting) {
    return message;
  }

  return `${timestamp}|${ms}|${message}`;
});

const fileFormat = format.printf(({ ms, message, timestamp }) => {
  return `${timestamp}|${ms}|${message}`;
});

const filename = hasSetting
  ? `data/logs_${settingsNumber}.log`
  : 'data/logs_main.log';

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), format.ms(), consoleFormat),
    }),
    new transports.File({
      filename,
      format: format.combine(format.timestamp(), format.ms(), fileFormat),
    }),
  ],
});

const log = (...messages) => {
  messages.forEach((message) => {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    logger.info(message);
  });
};

export { log };
