import winston, { createLogger, format } from 'winston';
import 'dotenv/config';

const logLevel = process.env.Log_LEVEL || 'error';

const logFormat = format.printf(({ level, message, timestamp, traceId }) => {
  const _traceId = traceId ? ` [${traceId}] ` : ' ';

  return `[${timestamp}] [${level}]${_traceId}${message}`;
});

export const logger = createLogger({
  level: logLevel,
  format: format.combine(format.timestamp(), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' }),
  ],
});

/**
 * logs all errors to *.log file
 */
export const log = (message: string, options?: { traceId: string | number }) =>
  logger.log(logLevel, message, options);

/**
 * handles exceptions
 */
export const handleExceptions = () => {
  ['uncaughtException', 'unhandledRejection'].forEach((exception) =>
    process.on(exception, (err) => {
      log(err.message);
      process.exit(1);
    })
  );
};
