import {searchForInvoices} from './invoice/detector';
import {invoiceFound} from './invoice/found';
import {initWidget} from './widget';
import './global.css';

const initializeBackgroundScript = () => {
  console.log('Init LE content script...');
  chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action === "confirm_decoded_invoice") {
      initWidget(request.decodedInvoice);
    }
  });
  searchForInvoices({invoiceFound});
  console.log('LE content script initialized.');
};

window.requestIdleCallback(initializeBackgroundScript);
