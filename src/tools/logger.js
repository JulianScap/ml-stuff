import { createLogger, format, transports } from 'winston';
import { settingsNumber } from './arguments.js';

const customFormat = format.printf(({ ms, message, timestamp }) => {
  return `${timestamp}|${ms}|${message}`;
});

const filename =
  typeof settingsNumber === 'number' && !Number.isNaN(settingsNumber)
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
