# This is probably a very bad idea because yarn will likely install a different version compared to the one present in
#   the server package
# Look into yarn berry add --cached
FROM node:alpine
WORKDIR /app
RUN yarn init -y && yarn add @prisma/client && yarn add -D prisma
COPY packages/server/prisma/ ./
CMD ["yarn", "prisma", "migrate", "dev", "--skip-generate"]
