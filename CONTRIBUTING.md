# Contributing to yestheory.family

Thanks for being interested in contributing! This document contains guidance on how to develop on this project.

## Requirements

To work on this project, you will need the following things:

1. [Docker](https://docker.com) for running a database and typesense locally
2. A [Discord application](https://discord.com/developers/applications)
3. [Node.js](https://nodejs.org) 18+
4. [Git](https://git-scm.com/)
5. Some code-editor of your choice suitable for TypeScript development
6. (Ideally) [YesBot running](https://github.com/Yes-Theory-Fam/yesbot-ts/blob/master/CONTRIBUTING.md#local-instance)

## Setup

1. Clone the repository (or a fork of it): `git clone git@github.com:yes-theory-fam/yestheory.family`
2. Install the package manager yarn through corepack: `corepack enable && corepack prepare --activate`
3. Install the packages: `yarn`
4. Start the development database and typesense: `docker compose up -d`
5. Copy the various .env(.local).example files to .env(.local) and fill them in
6. Seed some initial data into the CMS: `cd packages/cms && yarn seed`
7. In separate terminals / processes start (in that order; wait for each process to have started properly before
   launching the next as they depend on each other)
    1. The CMS: `cd packages/cms && yarn dev`
    2. The Node.js Backend: `cd packages/server && yarn dev`
    3. The Next.js Frontend: `cd packages/web && yarn dev`

## Opening Pull Requests

When opening a pull request, include your motivation behind it in the description, linking any related issues.

Try to use [conventional commits](https://www.conventionalcommits.org).

Automated checks are run on each push to a PR. If one fails, read through the log and see why it failed, correct the
mistake, then commit and push again. Most commonly a pipeline will fail because of formatting or linting errors. You can
easily fix *most* (not always all) of those issues by running `yarn lint` in the project directory. It is also
recommended to set up your code editor to automatically fix Prettier and ESLint errors on saving a file.

## Any questions?

If you have any other questions, ping the mod Michel over on
the [Yes Theory Fam Discord server](https://discord.gg/yestheory), or ask someone to ping him if you are not sure which
the right one is :)
