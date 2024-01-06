# @yestheory.family/web

This package contains the Next.js Frontend that is displayed to the user when visiting https://yestheory.family.

## Important commands

- `yarn codegen` regenerates code based on the .graphql files in the package
- `yarn dev` runs the frontend in development mode, hot-reloading on changes (runs `yarn codegen` on first start)
- `yarn storybook` runs Storybook in development mode, hot-reloading on changes

## Requirements

*These requirements are for running the actual frontend; they don't apply to running Storybook*

- A running backend (required because the codegen fetches its schema from there)
- Typesense running when searching through group-chats
