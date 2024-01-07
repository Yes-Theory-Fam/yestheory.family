FROM node:20.9-alpine as base

FROM base as builder

WORKDIR /app
COPY .yarn/ ./.yarn/
COPY .yarnrc.yml yarn.lock package.json ./

COPY packages/cms/ ./packages/cms

WORKDIR /app/packages/cms

ARG PAYLOAD_PUBLIC_WEB_FRONTEND_URL

RUN yarn workspaces focus && \
    yarn build

FROM base as runtime

RUN apk add curl --no-cache

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=packages/cms/dist/payload.config.js

WORKDIR /app

COPY package.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/packages/cms/ ./packages/cms/

EXPOSE 3001

ENTRYPOINT ["./packages/cms/docker-entrypoint.sh"]
CMD ["node", "packages/cms/dist/server.js"]
