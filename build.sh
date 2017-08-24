#!/usr/bin/env bash
cd "$(dirname "$0")"

# Clean up previous distributions
rm -rf dist
rm -rf build

# Binaries
NGC="node node_modules/.bin/ngc"
ROLLUP="node node_modules/.bin/rollup"

# ES6
$NGC -p src/tsconfig-build.json
$ROLLUP build/angular-highcharts.js \
  --output.file dist/angular-highcharts.js \
  --output.format es \
  --external "@angular/core,highcharts"

# ES5
$NGC -p src/tsconfig-es5.json
$ROLLUP build/angular-highcharts.js \
  --output.file dist/angular-highcharts.es5.js \
  --output.format es \
  --external "@angular/core,highcharts"

# UMD (legacy)
$ROLLUP dist/angular-highcharts.es5.js \
  --output.file dist/angular-highcharts.umd.js \
  --output.format umd \
  --external "@angular/core,highcharts" \
  --globals "@angular/core:ng.core,highcharts:Highcharts" \
  --name ng.highcharts

# Copy non-js files from build
rsync -a --exclude=*.js build/ dist

# Copy library package.json and README.md
cp src/package.json dist/package.json
cp README.md dist/README.md

# Set dist/package.json version
VERSION="$(node -p "require('./package.json').version")"
cd dist && npm --no-git-tag-version version $VERSION
