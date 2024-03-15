import logger from '@numbereight/logging';
import { asError } from '@numbereight/utils';

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception`, error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection`, asError(reason));
  process.exit(1);
});
