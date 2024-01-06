# @yestheory.family/e2e

This package contains [Playwright](https://playwright.dev/) tests that run in the pipeline to ensure proper
functionality of the all the moving parts.

## Important commands

-   `yarn playwright test` runs the testsuite against a currently running setup

## Requirements

-   A functional web application on port `http://localhost:3000` (can be changed using the env variable `FRONTEND_URL`)
