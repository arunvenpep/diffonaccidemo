# DiffonacciDemo

This is a codebase that implements the solution to a fictional problem - badly. The fictional scenario and its requirements are outlined below. Your task is to:

* Break the problems down into an effective first (1 week) sprint.
* Choose and do one task for each piece of the user feedback points.
* Don't spend more than 4 hours on this.

This task revolves around the fictional work item of 'diffonacci' - the computation resides in the file `./src/node/diffonacci.ts` - this is the only file you should avoid editing.

## Scenario

The following is a work of fiction to set a scene for the task:

NumberEight has acquired another company - DifferEight. This company made special hardware accelerators that allow us to efficiently calculate the very important 'diffonacci' numbers. It is important that every one of our 100,000 staff in our 1,000 offices can calculate diffonacci numbers; but the hardware is only available in one locked down datacentre of worker machines.

To solve this we commissioned the 'diffonacci' project;

Unfortunately the sole developer of this project has fallen ill before completing the project; we tried deploying to some internal stakeholders and it appeared to work, but this is the user feedback we received:

* Users don't understand what is going on. With guidance they can enter a diffonacci to calculate, but they struggle in finding the result.
* It's slow! But when we add more worker instances, it doesn't get any faster.
* Our engineering ops team can't easily see what is going on and why.

For this demo to work, we need you to pretend that:

* The diffonacci calculation is useful
  - we have no use for it; it is just a simple example.
* The diffonacci calculation is very compute intensive, and can only run on a few hundred special machines. In reality it is very simple, and uses sleep to emulate compute issues.
  - this is why we need the worker processes.
* For security reasons the 'special machines' are air-gapped, except for a connection to a single postgres database; this database can also be accessed from our office intranets.
  - this is why we need the postgres queue.
* We have thousands of staff and hundreds of offices, each with their own private intranet.
  - this is why there might be many instances of the client.

The requirements of this tool are simple:

* Code should be written in TypeScript or SQL.
* The UI should be written in React
* There should be a queue implemented in postgres to which clients can add tasks, workers can pull tasks, and clients can read results.
* The react web site must support:
  - users to submit a diffonacci calculation and get their result.
  - observability for engineers to monitor the service and diagnose issues.
* You may use any additional tools or libraries you would like that do not break the conditions of the scenario.

## Evaluation

We will look for:

Where coding is done we will look for:
* good coding practices - anything you touch should be better than it was when you started (be able to explain why it's better).
* a good user experience - through presentation, interaction, and affordances.
* correctness.
* an understanding of observability.
* knowledge of the technologies used (SQL, React, TypeScript, NodeJS).

We will follow up on these areas in discussion - 

## Submission

The zip contains a blank local git repo - we recommend you use it.

Submit one of:
- a `.zip` or `.gz` file containing all of the finished work sent to `chris@numbereight.ai`
- a link to a private web hosted repository to which `chris@numbereight.ai` has read access
- a git diff file to `chris@numbereight.ai`

## Getting Started

### Dependencies

* You need the following installed:
  - docker
    - https://docs.docker.com/get-docker/
  - node js version v20.10.0 or greater
    - https://github.com/nvm-sh/nvm
  - yarn
    - with node v20+ installed; `corepack enable yarn`
  - repository dependencies
    - run `yarn` at the root of the repository. All dependencies should install fine.

### Setting up your environment

#### VSCode

We've included a `workspace.code-workspace` file that should correctly set the typescript SDK for IntelliSense. If it does not, use `> TypeScript: Select TypeScript Version...` and select `5.3.3-sdk`.

#### JetBrains IDE's

See https://www.jetbrains.com/help/idea/settings-languages-typescript.html#ws_ts_use_ts_service_checkbox

#### Other IDE's

For typescript type completion in other IDE's you need to find how to change the typescript SDK used to `.yarn/sdks/typescript/lib` and enable support for "pnp" and "yarn 2".

### Running code

We've included the following scripts:

* `./startPostgres.sh`
  - it will start a dockerised postgres server. This is used by the server and worker, as specified in `./src/node/utils/getDatabase.ts`. This requires docker.
* `yarn setupDatabase`
  - it will connect to the postgres database and initialise the table schema; this requires the `./startPostgres.sh` script to be running.
* `yarn build`
  - will use esbuild to bundle the `src/browser/index.tsx` with its dependencies into `public/index.js`.
  - use `yarn watch` to automatically rebuild on source changes. Note: hot module reloading is not used, so you will still need to refresh the page to see changes.
* `yarn server`
  - will use ts-node to run `src/node/server.ts`, which hosts the website at `public` on port 3000 alongside the site's API.
* `yarn worker`
  - will use ts-node to run `src/node/worker.ts`, which processes items in the postgres queue.
* `yarn format`
  - will run `prettier` against all source files; this is a convenience script
