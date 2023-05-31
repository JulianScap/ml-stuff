import { createLogger, format, transports } from 'winston';
import { settingsNumber } from './arguments.js';

const hasSetting =
  typeof settingsNumber === 'number' && !Number.isNaN(settingsNumber);

const customFormat = format.printf(({ ms, message, timestamp }) => {
  if (hasSetting) {
    return message;
  }

  return `${timestamp}|${ms}|${message}`;
});

const filename = hasSetting
  ? `data/logs_${settingsNumber}.log`
  : 'data/logs_main.log';

const logger = createLogger({
  format: format.combine(format.timestamp(), format.ms(), customFormat),
  transports: [new transports.Console(), new transports.File({ filename })],
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
