# @yestheory.family/server

This package contains the Node.js Backend that acts as a data juggler between all the different parts of the
application. It uses [Prisma ORM](https://prisma.io) for connecting to the database.

## Important commands

-   `yarn dev` runs the backend in development mode, restarting on changes
-   `yarn prisma <prisma command>` interact with the database
    -   `yarn prisma db push` pushes the current schema into the database without migrations (used during development)
    -   `yarn prisma migrate dev` creates a new migration for the project (required for PRs when the schema changes)

## Requirements

-   A running CMS (required because the backend stitches the CMS' schema)
