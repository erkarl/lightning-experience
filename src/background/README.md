# Lightning Experience Background Script
This is the part of the extension that runs in the background and cannot communicate with the DOM directly. All communicate with LND client is done here.

Communication with the content script that "scans" for invoices on the page happens via `chrome.runtime.onMessage` and `chrome.runtime.sendMessage` API.

## Requirements
* [yarnpkg.com/en/](https://yarnpkg.com/en/)
* [nodejs.org/en/](https://nodejs.org/en/)

## Build
`yarn build` creates production optimized `content/dist/lightning-experience-background.bundle.js` which should be linked to `extension/dist/lightning-experience-background.bundle.js`.

## Start Development Server
`yarn start`
