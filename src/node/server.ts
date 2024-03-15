import express, { NextFunction } from 'express';
import logger from '@numbereight/logging';
import { getPostgresDatabase } from './utils/getDatabase';

const db = getPostgresDatabase();
const app = express();
const port = 3000;

// a basic redirect of / -> /index.html
app.get('/', (_req, res) => {
  res.redirect(301, '/index.html');
});

// Add JSON middleware to automatically parse JSON messages.
app.use(express.json());

// when a user submits a new request
app.post('/submit', async (req, res) => {
  const { a, b } = req.body;

  logger.info(`[server] received new /submit request`, { a, b });

  await db?.run<{}>(
    'postgres',
    'insert new item',
    (q) => `
    INSERT INTO diffonacci.queue (
      value
    ) VALUES (
      ${q.value({ a, b })}
    )`,
  );

  res.status(200).send();
});

// return observability data for the queue
app.get('/queue', async (_req, res) => {
  logger.info(`[server] received new /queue request`);

  const results = await db?.run<{ result: string }>(
    'postgres',
    'get queue state',
    () => `
    SELECT
      *
    FROM diffonacci.queue
    `,
  );

  res.send(results);
});

app.use(express.static('public'));

// Error handling
app.use(function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) {
  logger.error(`[server] encountered an internal error`, err, {
    url: req.url,
  });

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send('Server encountered an internal error');
});

// Start the server
app.listen(port, () => {
  logger.info(`[server] listening on port ${port}`);
});
