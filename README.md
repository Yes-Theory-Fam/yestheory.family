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
- [Docker](https://www.docker.com/)

## How do I use this?

1. Local development:  
   Clone, `yarn install`, and use one of the [available scripts](#available-scripts)! Everything should just work
   together in the setup you download.

2. Docker setup:
   Clone, `docker-compose up`, have a look at the [ports](#ports), where the built production instances should be
   running (Note: The docker setup is not suitable for development as it doesn't use volumes).

If you are building a serious project with this, I highly recommend replacing `@project/` with `@<projectname>/` in
all `package.json` files as well as `projectname` with the actual project's name in `docker-compose.yml`.

## Available scripts

The repository comes with a bunch of yarn scripts you can run to do several things. The most important ones are
available from the root directory of the project and listed here:

`yarn eslint:check` - Runs linting in all packages.  
`yarn eslint:write` - Runs linting in all packages and fixes auto-fixable problems.  
`yarn format:check` - Runs prettier on the entire project and reports styling issues.  
`yarn format:write` - Runs prettier on the entire project and fixes styling issues.  
`yarn server:dev` - Runs the backend for development (using ts-node-dev).  
`yarn server:generate` - Generates backend source and packages using prisma.  
`yarn storybook` - Runs and opens the Storybook project.  
`yarn web:dev` - Runs the next frontend for development.  
`yarn web:generate` - Generates GraphQL types and hooks for the frontend.

## `.env` files

Currently, the boilerplate utilizes several `.env` files (I am not too happy about it, feel free to open an issue for
suggesting an approach to only use one):

- `.env` contains environment variables used in the [Docker setup](#docker)
- `packages/server/.env` contains environment variables local to the server package, currently only used for providing
  the `DATABASE_URL` variable to prisma
- `packages/web/.env.local` contains variables usable in
  Next.js ([docs](https://nextjs.org/docs/basic-features/environment-variables))

For all used `.env` files listed above, there is a `.env.example` file in this repository that you can copy to `./.env`
and adapt to your needs.

## Docker

The server and web packages have been dockerized, and a docker-compose setup using postgres as database is available.

### Environment variables

The docker setup expects a series of environment variables to be set:

`DATABASE_HOST` - The host on which to find the database on  
`DATABASE_DB_NAME` - The name of the database to use  
`DATABASE_USER` - The user to use for database login  
`DATABASE_PASSWORD` - The password to use for database login  
`BACKEND_PORT`* - The port to run the backend on (default: 5000)  
`BACKEND_HOST` - The hostname used inside the docker-network to connect to the server

`*` This value is used during build-time of the container already to expose the correct port. If you change it, you have
to rebuild the container!

## Ports

The boilerplate currently uses the following ports:

| Port | Service |
|------|---------|
| 3000 | Next.js |
| 5000 | Backend* |
| 5432 | Database |
| 6006 | Storybook |

`*` The port can be changed using the `BACKEND_PORT` environment variable.
