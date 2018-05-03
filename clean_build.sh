#!/bin/bash
rm -Rf extension/dist
mkdir extension/dist
cd src/background
yarn install
yarn build
cd ../content
yarn install
yarn build
cd ../ui
yarn install
yarn build
