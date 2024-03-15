/**
 * Reads the DATABASE_CREDENTIALS env var to start the database
 */

import { getDatabaseOfType } from '@numbereight/udatabase';

const DATABASE_CREDENTIALS = (process.env['DATABASE_CREDENTIALS'] =
  process.env.DATABASE_CREDENTIALS ?? 'postgresql://n8:n8@127.0.0.1:5432/test');

export function getPostgresDatabase() {
  return getDatabaseOfType('postgres', DATABASE_CREDENTIALS);
}
