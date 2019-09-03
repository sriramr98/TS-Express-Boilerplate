import pino from 'pino';
import expressPino from 'express-pino-logger';

export const logger = pino();
export const expressLogger = expressPino({
  logger,
});

export default {
  logger,
  expressLogger,
};
