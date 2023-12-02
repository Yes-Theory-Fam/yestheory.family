#!/usr/bin/env sh

node node_modules/.bin/payload migrate

if [ "$ENABLE_DATASEEDER" = "true" ]; then node ./packages/cms/dist/dataseeder/main.js ; fi

exec "$@"
