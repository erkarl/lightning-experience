import {searchForInvoices} from './invoice/detector';
import {invoiceFound} from './invoice/found';
import {initWidget} from './widget';

const initializeBackgroundScript = () => {
  console.log('Init LE content script...');
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action === "confirm_decoded_invoice") {
      // TODO: It currently does not decode the invoice from LND side and goes straight to pay.
      initWidget();
    }
  });
  searchForInvoices({invoiceFound});
  console.log('LE content script initialized.');
};

window.requestIdleCallback(initializeBackgroundScript);

