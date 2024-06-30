#!/usr/bin/env sh

/usr/local/bin/node /app/packages/web/build/scripts/ensure-db-exists.js

if [ "$ENABLE_DATASEEDER" = "true" ]; then /usr/local/bin/node /app/packages/web/build/scripts/dataseeder/main.js; fi

yarn payload migrate

yarn start
