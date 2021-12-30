#! /bin/sh

/usr/local/bin/yarn prisma migrate deploy --schema node_modules/@yes-theory-fam/database/prisma/schema.prisma
/usr/local/bin/node /app/dist
