import logger from '@numbereight/logging';
import { getPostgresDatabase } from './utils/getDatabase';
import { sleep } from '@numbereight/utils';
import { diffonacci } from './diffonacci';
import { makeRefinement, refineNumber } from '@normed/refinements';

const refineRequest = makeRefinement({
  a: refineNumber,
  b: refineNumber,
});

const db = getPostgresDatabase();

async function worker() {
  logger.info(`[worker] started`);

  while (true) {
    // Get the next item in the queue
    const items = await db?.run<{
      jobid: string;
      done: boolean;
      value: string;
    }>(
      `postgres`,
      'get next queue item',
      `
        SELECT
          *
        FROM diffonacci.queue
        WHERE done = FALSE
      `,
    );

    if (!items?.length) {
      // There was nothing to process
      // Sleep for a bit, then check again
      await sleep(250);
      continue;
    }

    // There was an item in the queue. Lets process it!
    const [item] = items;
    logger.info(`[worker] Processing item`, {
      jobid: item.jobid,
    });

    // Validate it
    // nb; you are unlikely to know this validation library. If you
    //  want to change it for any reason - go ahead!
    const request = refineRequest(
      [item.jobid, 'value'],
      JSON.parse(item.value),
    );
    if (request instanceof Error) {
      throw request;
    }

    // Do the calculation
    const result = await diffonacci(request.a, request.b);

    // Save the result
    db?.run<{}>(
      'postgres',
      'save processing result',
      (q) => `
      UPDATE diffonacci.queue SET
        value = ${q.value(result)},
        done = TRUE
      WHERE jobid = ${q.value(item.jobid)}
      `,
    );
    logger.info(`[worker] finished item`, { jobid: item.jobid });
  }
}

worker();
