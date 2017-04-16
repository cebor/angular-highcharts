#!/usr/bin/env bash
cd "$(dirname "$0")"

cd src

VERSION=$(npm version "$1" -m "bump version to %s")
MESSAGE="bump version to `echo $VERSION | cut -c2-`"
git commit -a -m "$MESSAGE" && git tag $VERSION -m "$MESSAGE"
