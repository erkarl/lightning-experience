# Lightning Experience Background Script
This is the part of the extension that runs in the background and cannot communicate with the DOM directly. All communicate with LND client is done here.

Communication with the content script that "scans" for invoices on the page happens via `chrome.runtime.onMessage` and `chrome.runtime.sendMessage` API.

## Build
`yarn build` creates production optimized build into `extension/dist/lightning-experience-background.bundle.js`

## Start Development Server
`yarn start`
