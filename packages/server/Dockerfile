# Install dependencies only when needed
FROM node:14-alpine AS deps
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
COPY packages/server/package.json ./packages/server/

# Install dependencies for the workspace
RUN yarn plugin import workspace-tools
WORKDIR /app/packages/server
RUN yarn workspaces focus

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /app

# Copy node_modules and other side products from deps
COPY --from=deps /app/packages/server /app/packages/server
COPY --from=deps /app/node_modules /app/node_modules

# Copy dependency information and source, then build
COPY yarn.lock .
COPY package.json .
COPY packages/server /app/packages/server
WORKDIR /app/packages/server
RUN yarn prisma generate
RUN yarn build

# Copy generated source to dist manually
RUN cp -r /app/packages/server/src/__generated__ /app/packages/server/dist

# Build the actual running server
FROM node:14-alpine
WORKDIR /app

# Copy relevant data from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/server/dist ./dist

# Set environment data, export and launch
ARG BACKEND_PORT=5000
ENV BACKEND_PORT=$BACKEND_PORT
ENV NODE_ENV="production"

EXPOSE $BACKEND_PORT

CMD ["node", "dist"]
