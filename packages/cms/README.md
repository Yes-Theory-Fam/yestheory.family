# @yestheory.family/cms

This package contains the Payload CMS hosted at https://admin.yestheory.family.

## Important commands

-   `yarn dev` runs the CMS in development mode, restarting on changes
-   `yarn seed` inserts some basic data including an initial user based on the .env file into the database
-   `yarn generate:types` generates TypeScript types based on the collection definitions (can be imported
    as `import { type GeneratedTypes } from "payload";`)

## Requirements

-   Needs both the database and typesense running to start
-   Needs Node.js Backend launched after it to authenticate requests
