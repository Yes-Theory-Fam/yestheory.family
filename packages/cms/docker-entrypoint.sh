#!/usr/bin/env sh

if [ "$ENABLE_DATASEEDER" = "true" ]; then node ./packages/cms/dist/dataseeder/main.js ; fi

node node_modules/.bin/payload migrate

exec "$@"
