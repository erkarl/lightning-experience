import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
const ONE_SECOND_IN_MS = 1000;

console.log('Lightning Experience content script has been activated.');

const invoiceValid = (invoiceCode) => {
  // TODO: Actually validate the input.
  return invoiceCode;
};

const invoiceFound = (invoiceCode) => {

  chrome.storage.sync.get('currentInvoice', (data) => {
    const shouldOverrideOldInvoice = invoiceCode !== data.currentInvoice;
    if (shouldOverrideOldInvoice) {
      console.log('Found invoice. Decoding...', invoiceCode);

      chrome.storage.sync.set({currentInvoice: invoiceCode}, () => {
        console.log("Current invoice has been changed.");
      });

      chrome.runtime.sendMessage({type: "notification", options: {invoiceCode}});
    }

  });

};

setInterval(() => {
  const invoiceCodeElement = document.getElementById('invoice-code');

  if (invoiceCodeElement) {
    const invoiceCode = invoiceCodeElement.dataset['invoiceCode'];
    invoiceFound(invoiceValid(invoiceCode));
  }
}, ONE_SECOND_IN_MS);

const initWidget = () => {
  console.log('Initializing UI...');
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
  console.log('rootLE created & injected.', rootLE);
  // TODO: Eliminate HACK
  const invoiceCodeElement = document.getElementById('invoice-code');
  const codeForApp = invoiceCodeElement.dataset['invoiceCode'];
  ReactDOM.render(<App invoiceCode={codeForApp} />, rootLE);
  console.log('UI started.');
};

console.log('Listening extension...');
chrome.runtime.onMessage.addListener(function(request, sender) {
  console.log('incoming request', request);
  if (request.action === "confirm_decoded_invoice") {
    console.log('decoded_invoice received, presenting to user');
    initWidget();
    // const confirmResponse = confirm(`Pay ${request.decodedInvoice.amount}?`);
    // console.log('confirmResponse', confirmResponse);
    /*
    if (confirmResponse == true) {
      // TODO: Pay the invoice.
    }
    */
  }
});
