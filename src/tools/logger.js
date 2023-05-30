import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ ms, message, timestamp }) => {
  return `${timestamp}|${ms}|${message}`;
});

const logger = createLogger({
  format: format.combine(format.timestamp(), format.ms(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'data/logs.log' }),
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
export default { log };
