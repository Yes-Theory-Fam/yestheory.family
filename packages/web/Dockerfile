# syntax=docker/dockerfile:1.2

# Install dependencies only when needed
FROM node:16.6-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy yarn data
COPY .yarn/ ./.yarn/
COPY .yarnrc.yml ./
COPY yarn.lock package.json ./

# Copy package.jsons of all related packages
COPY packages/common/package.json ./packages/common/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/ui/package.json ./packages/ui/
COPY packages/web/package.json ./packages/web/

ARG YTF_NPM_AUTH_TOKEN
COPY yarn-with-secrets ./

# Install dependencies for the workspace
RUN --mount=type=secret,id=YTF_NPM_AUTH_TOKEN ./yarn-with-secrets plugin import workspace-tools
WORKDIR /app/packages/web
RUN --mount=type=secret,id=YTF_NPM_AUTH_TOKEN /app/yarn-with-secrets workspaces focus

# Rebuild the source code only when needed
FROM node:16.6-alpine AS builder
WORKDIR /app

# Copy node_modules and other side products from deps
COPY --from=deps /app/packages/web/ ./packages/web/
COPY --from=deps /app/packages/ui/ ./packages/ui/
COPY --from=deps /app/node_modules/ ./node_modules/

# Copy dependency information and source, then build
COPY yarn.lock .
COPY package.json .
COPY packages/web/ ./packages/web
COPY packages/ui/ ./packages/ui
WORKDIR /app/packages/web

COPY yarn-with-secrets ./

ARG YTF_NPM_AUTH_TOKEN
RUN --mount=type=secret,id=YTF_NPM_AUTH_TOKEN ./yarn-with-secrets build

# Production image, copy all the files and run next
FROM node:16.6-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/node_modules/ ./node_modules

COPY --from=builder /app/packages/ui/ ./packages/ui

COPY --from=builder /app/packages/web/next.config.js ./packages/web/
COPY --from=builder /app/packages/web/.next/ ./packages/web/.next/
COPY --from=builder /app/packages/web/package.json ./packages/web/
COPY --from=builder /app/packages/web/.env.local ./packages/web/.env.local

COPY yarn.lock package.json ./

EXPOSE 3000

RUN npx next telemetry disable
WORKDIR /app/packages/web
CMD ["yarn", "start"]
