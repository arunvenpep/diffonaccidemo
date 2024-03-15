/**
 * Creates the diffonacci base tables in the database given by the
 *   postgres credentials in the `DATABASE_CREDENTIALS` env var.
 */

import { getPostgresDatabase } from './utils/getDatabase';
import logger from '@numbereight/logging';

const db = getPostgresDatabase();

async function setupDatabase() {
  await db.run(
    ['postgres'],
    'create schema diffonacci',
    () => `
    CREATE SCHEMA IF NOT EXISTS diffonacci;
  `,
  );

  await db.run(
    ['postgres'],
    'create table diffonacci.queue',
    () => `
    CREATE TABLE IF NOT EXISTS diffonacci.queue (
      jobid SERIAL,
      value TEXT NOT NULL, -- e.g. '{a: number, b: number}' for a request or 'number' for a result
      done BOOLEAN DEFAULT FALSE,
      PRIMARY KEY (jobid)
    );
    `,
  );
}

setupDatabase();
logger.info(`Successfully set up postgres database`);
