#!/usr/bin/env bash
cd "$(dirname "$0")"

# Clean up previous distributions
rm -rf dist
rm -rf build

# Variables
VERSION="$(node -p "require('./package.json').version")"
NGC="node node_modules/.bin/ngc"
ROLLUP="node node_modules/.bin/rollup"

# Run Angular Compiler
$NGC -p src/tsconfig-build.json
# Rollup angular-highcharts.js
$ROLLUP build/angular-highcharts.js -o dist/angular-highcharts.js

# Repeat the process for es5 version
$NGC -p src/tsconfig-es5.json
$ROLLUP build/angular-highcharts.js -o dist/angular-highcharts.es5.js

# Copy non-js files from build
rsync -a --exclude=*.js build/ dist

# Copy library package.json and README.md
cp src/package.json dist/package.json
cp README.md dist/README.md

# Set dist/package.json version
cd dist && npm --no-git-tag-version version $VERSION
