import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {searchForInvoices} from './invoice/detector';
import {invoiceFound} from './invoice/found';

console.log('Lightning Experience content script has been activated.');

searchForInvoices({invoiceFound});

const initWidget = () => {
  const rootLE = document.createElement('div');
  const guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
  rootLE.id = guid();
  const invoiceCode = document.getElementById('invoice-code')
  const rect = invoiceCode.getBoundingClientRect();
  rootLE.style.position = 'absolute';
  rootLE.style.top = `${rect.top}px`;
  const WIDGET_MARGIN = 80;
  rootLE.style.right = `${rect.left-WIDGET_MARGIN}px`;
  document.body.append(rootLE);
  // TODO: It currently naively assumes there is only 1 invoice on the page. For proof of concept this will do.
  chrome.storage.sync.get('currentInvoice', (data) => {
    ReactDOM.render(<App invoiceCode={data.currentInvoice} />, rootLE);
    console.log('Widget injected.');
  });
};

console.log('Listening extension...');
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action === "confirm_decoded_invoice") {
    // TODO: It currently does not decode the invoice from LND side and goes straight to pay.
    initWidget();
  }
});
