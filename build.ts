#!/usr/bin/env yarn node

/**
 * Usage:
 *   ./build.ts [--watch]
 *
 * # To build once
 *   ./build.ts
 *
 * # To use watch mode
 *   ./build.ts --watch
 */

// Suppress side-effect of importing @numbereight/logging
process.env['DISABLE_LOG_SYSTEM_INFORMATION'] = 'true';

import esbuild from 'esbuild';
import logger from '@numbereight/logging';

(async function () {
  const config = {
    entryPoints: ['src/browser/index.tsx'],
    bundle: true,
    sourcemap: true,
    outfile: 'public/index.js',
    platform: 'browser',
  } satisfies esbuild.BuildOptions;

  // Parse Arguments
  const watchMode = process.argv.includes('--watch');

  let errors = false;
  let warnings = false;

  // Normal build
  if (!watchMode) {
    logger.info(`[browser] build starting`);
    const result = await esbuild.build(config);
    if (result.errors.length) {
      logger.error(
        `[browser] build failed with ${result.errors.length} errors, ${result.warnings.length} warnings`,
      );
      errors = true;
      warnings = warnings || result.warnings.length > 0;
    } else if (result.warnings.length) {
      logger.warn(
        `[browser] build succeeded with ${result.warnings.length} warnings`,
      );
      warnings = true;
    } else {
      logger.info(`[browser] build succeeded`);
    }
    process.exit(errors ? 2 : warnings ? 1 : 0);
  }

  // Watch build
  const context = await esbuild.context(config);

  await context.watch();
  logger.info(`[browser] Watching...`);

  process.on('SIGTERM', async () => {
    await context.dispose();
    logger.info(`[browser] Stopped watching`);
  });
})();
