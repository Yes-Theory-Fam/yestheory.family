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
- [Chromatic](https://github.com/chromaui/chromatic-cli)

## Frontend

- [Preact](https://github.com/preactjs/preact/)
- [Chakra-UI](https://github.com/chakra-ui/chakra-ui/)
- [Next.js](https://github.com/vercel/next.js/)
- [urql](https://github.com/FormidableLabs/urql/)
- [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator/)

## Tooling

- [Prettier](https://github.com/prettier/prettier/)
- [ESLint](https://github.com/eslint/eslint/)
- [Docker](https://github.com/moby/moby)
- [GitHub Action](https://github.com/features/actions)

## How do I use this?

0. Clone this repository

1. Create the env files mentioned in [.env files](#env-files). For a starter setup you can just copy the .example files
   to their name without the .example (for Chromatic, see the [general steps below](#general)).

2. **Local development**:  
   Run `yarn install`, then `yarn server:generate` and use one of the [available scripts](#available-scripts)!
   Everything should just work together in the setup you download (Note: `yarn web:generate` requires the backend to be
   running because the code generator loads the schema directly from the server).

3. **Docker setup**:
   Run `docker-compose up`, wait for the images to build, then have a look at the [ports](#ports), where the built
   production instances will be running (Note: The docker setup is not suitable for development as it doesn't use
   volumes, storybook won't be launched in containers either).

### Required steps for an actual project

If you are building a serious project with this, there are a few additional changes required to get everything running
smoothly:

#### General

You should follow these steps whenever you start a new project with this boilerplate.

- Replace `@project/` with `@<projectname>/` in all package.json files
- Replace `fullstack-typescript-boilerplate-example` with your actual project's name in `docker-compose.yml`
  and `docker-compose.yml`
- Create a new project on [Chromatic](https://www.chromatic.com/) and place your project token in `packages/ui/.env`
  as `CHROMATIC_PROJECT_TOKEN=token`

#### GitHub Actions

You should follow these steps when you have this repository on GitHub and want to use Actions as CI/CD tool.

- Replace `fullstack-typescript-boilerplate-example` with your actual project's name in `.github/workflows/build.yml`
- Create three Docker repositories on [Docker Hub](https://hub.docker.com), named `<name>-migration`, `<name>-server`
  and `<name>-web` replacing `<name>` with your project's name
- Go to your repository > Settings > Secrets and create these secrets:
    - `CHROMATIC_PROJECT_TOKEN` - contains the Chromatic token for the project 
    - `DOCKERHUB_USERNAME` - contains the username you created the repositories in
    - `DOCKERHUB_TOKEN` - contains a Docker Hub access token

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
`yarn web:generate`* - Generates GraphQL types and hooks for the frontend.

`*` - This script requires the backend to be running on `http://localhost:5000/graphql` because the code generator loads
the schema directly from the server.

## `.env` files

Currently, the boilerplate utilizes several `.env` files (I am not too happy about it, feel free to open an issue for
suggesting an approach to only use one):

- `.env` contains environment variables used in the [Docker setup](#docker)
- `packages/server/.env` contains environment variables local to the server package, currently only used for providing
  the `DATABASE_URL` variable to prisma
- `packages/ui/.env` contains the chromatic project token  
- `packages/web/.env.local` contains variables usable in
  Next.js ([docs](https://nextjs.org/docs/basic-features/environment-variables))

For all used `.env` files listed above, there is a `.env.example` file in this repository that you can copy to `./.env`
and adapt to your needs.

## Docker

The server and web packages have been dockerized, and a docker-compose setup using postgres as database is available.

### Environment variables

The docker-compose setup expects a series of environment variables to be set:

`DATABASE_HOST` - The host on which to find the database on  
`DATABASE_DB_NAME` - The name of the database to use  
`DATABASE_USER` - The user to use for database login  
`DATABASE_PASSWORD` - The password to use for database login  
`BACKEND_PORT`* - The port to run the backend on (default: 5000)  
`BACKEND_HOST` - The hostname used inside the docker-network to connect to the server (default: server)

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
