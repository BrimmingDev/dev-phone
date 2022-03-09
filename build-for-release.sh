#!/usr/bin/env sh

echo "Building minified assets from /web-client"
cd web-client
npm run build
cd ..

echo "Copying built assets to /cli-plugin"
rm -rf cli-plugin/dist/public
cp -R  web-client/dist cli-plugin/dist/public

echo "All done. Built assets will be served by the express server"
