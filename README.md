# Fullstack TypeScript Boilerplate

This project provides a monorepo setup for a Fullstack TypeScript project and comes with the following:

## Backend
- [Koa](https://github.com/koajs/koa/)  
- [Apollo GraphQL Server](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-koa/)  
- [TypeGraphQL](https://github.com/MichalLytek/type-graphql/)  
- [Prisma ORM](https://github.com/prisma/prisma/)  

## UI Builder (subpackage to build/theme your UI in)
- [Preact](https://github.com/preactjs/preact/)  
- [Chakra-UI](https://github.com/chakra-ui/chakra-ui/)  
- [Storybook](https://github.com/storybookjs/storybook/)  

## Frontend
- [Preact](https://github.com/preactjs/preact/)  
- [Chakra-UI](https://github.com/chakra-ui/chakra-ui/)  
- [Next.js](https://github.com/vercel/next.js/)  
- [urql](https://github.com/FormidableLabs/urql/)  
- [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator/)  

## Tooling
- [Prettier](https://github.com/prettier/prettier/)
- [ESLint](https://github.com/eslint/eslint/)

## How do I use this?

Clone, `yarn install`, and go! Everything should just work together in the setup you download.

If you are building a serious project with this, I highly recommend replacing `@project/` with `@<projectname>/` in all `package.json` files.

## Available scripts

The repository comes with a bunch of yarn scripts you can run to do several things. The most important ones are available from the root directory of the project and listed here:

`yarn eslint:check` - Runs linting in all packages.  
`yarn eslint:write` - Runs linting in all packages and fixes auto-fixable problems.  
`yarn format:check` - Runs prettier on the entire project and reports styling issues.  
`yarn format:write` - Runs prettier on the entire project and fixes styling issues.  
`yarn server:dev` - Runs the backend for development (using ts-node-dev).  
`yarn server:generate` - Generates backend source and packages using prisma.  
`yarn storybook` - Runs and opens the Storybook project.  
`yarn web:dev` - Runs the next frontend for development.  
`yarn web:generate` - Generates GraphQL types and hooks for the frontend.  
