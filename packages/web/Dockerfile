# syntax=docker/dockerfile:1.2

# Install dependencies only when needed
FROM node:20.9-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy yarn data
COPY .yarn/ ./.yarn/
COPY .yarnrc.yml ./
COPY yarn.lock package.json ./

# Copy package.jsons of all related packages
COPY packages/web/package.json ./packages/web/

WORKDIR /app/packages/web
RUN yarn workspaces focus

# Rebuild the source code only when needed
FROM node:20.9-alpine AS builder
WORKDIR /app

ARG FRONTEND_URL
ARG NEXT_PUBLIC_PAYLOAD_URL

# Copy node_modules and other side products from deps
COPY --from=deps /app/packages/web/ ./packages/web/
COPY --from=deps /app/node_modules/ ./node_modules/

# Copy dependency information and source, then build
COPY yarn.lock .
COPY package.json .
COPY packages/web/ ./packages/web
WORKDIR /app/packages/web

RUN yarn build

# Production image, copy all the files and run next
FROM node:20.9-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/node_modules/ ./node_modules
# TODO look into standalone output builds
COPY --from=builder /app/packages/web/next.config.js ./packages/web/
COPY --from=builder /app/packages/web/.next/ ./packages/web/.next/
COPY --from=builder /app/packages/web/public/ ./packages/web/public/
COPY --from=builder /app/packages/web/package.json ./packages/web/

COPY yarn.lock package.json ./

EXPOSE 3000

RUN npx next telemetry disable
WORKDIR /app/packages/web
CMD ["yarn", "start"]
