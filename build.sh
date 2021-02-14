#!/bin/bash
set -ex

npm install
npx --max_old_space_size=8192 ng build --configuration=${ENVIRONMENT} --aot --build-optimizer --vendor-chunk --common-chunk  --source-map=false --output-hashing=bundles
