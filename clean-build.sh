#!/usr/bin/env sh

## This removes all the files created by ./build-for-release.sh

echo "Removing minified assets from /client"
rm -rf web-client/build

echo "Removing built assets from /plugin-dev-phone/public"
rm -rf cli-plugin/dist/public

echo "All done. Built assets have been removed"
