#! /bin/sh

/usr/local/bin/yarn prisma migrate deploy
/usr/local/bin/node /app/dist
