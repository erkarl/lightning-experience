# Lightning Experience Content Script
This is the part of the extension that gets injected into the users' DOM content in order to detect invoices on the page.

Communication with the background script that handles all LND related communicatin happens via `chrome.runtime.onMessage` and `chrome.runtime.sendMessage` API.

## Build
`yarn build` creates production optimized build into `extension/dist/lightning-experience-content.bundle.js`

## Start Development Server
`yarn start`

## Tests
`yarn test`
or
`yarn test:watch` to re-run the tests on file changes.
