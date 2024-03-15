/**
 * This file should be left *as is*. Consider this a black box that is doing some hard work.
 */

import { sleep } from '@numbereight/utils';

async function fibonacci(n: number): Promise<number> {
  if (n === 0 || n === 1) {
    return n;
  }
  let previous = 1;
  let previous_previous = 0;
  let result = 1;
  for (let i = 2; i < n; i++) {
    // (it isn't actually hard to compute diffonacci - we are just pretending it is)
    await sleep(200);

    previous_previous = previous;
    previous = result;
    result = previous + previous_previous;
  }
  return result;
}

export async function diffonacci(a: number, b: number): Promise<number> {
  return await Promise.all([a, b].map(fibonacci)).then(
    ([f_a, f_b]) => f_a - f_b,
  );
}
