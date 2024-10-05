FROM node:20.9-alpine as base
RUN apk add --no-cache libc6-compat && \
    corepack enable

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy yarn data
COPY .yarnrc.yml ./
COPY yarn.lock package.json ./

# Copy package.jsons of all related packages
COPY packages/web/package.json ./packages/web/

WORKDIR /app/packages/web
RUN yarn workspaces focus

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

ARG NEXT_PUBLIC_FRONTEND_URL
ENV NEXT_PUBLIC_FRONTEND_URL=$NEXT_PUBLIC_FRONTEND_URL

# Copy node_modules and other side products from deps
COPY --from=deps /app/packages/web/ ./packages/web/
COPY --from=deps /app/node_modules/ ./node_modules/

# Copy dependency information and source, then build
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/web/ ./packages/web
WORKDIR /app/packages/web

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/node_modules/ ./node_modules
# TODO look into standalone output builds
COPY --from=builder /app/packages/web/next.config.ts ./packages/web/
COPY --from=builder /app/packages/web/.next/ ./packages/web/.next/
COPY --from=builder /app/packages/web/public/ ./packages/web/public/
COPY --from=builder /app/packages/web/build/ ./packages/web/build/
COPY --from=builder /app/packages/web/package.json ./packages/web/

COPY yarn.lock .yarnrc.yml package.json ./

EXPOSE 3000

RUN npx next telemetry disable

WORKDIR /app/packages/web
COPY packages/web/docker-entrypoint.sh ./

CMD ["./docker-entrypoint.sh"]
