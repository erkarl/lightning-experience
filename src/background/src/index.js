import { payInvoice, decodeInvoice, getInfo } from './lnd-rest/requests';

console.log('Starting background bundle');

console.log('Adding external message listener...');
const EXPERIMENTAL_AUTO_PAY_INVOICE = true;
const MAX_AUTO_PAY_AMOUNT = 1;

const onMessage = async (request/*, sender */) => {
  console.log('onMessage', request);
  // TODO: Make sure sender is whitelisted and reject by default.
  if (request.type === 'pay_invoice') {
    await payInvoice(request.options.invoiceCode);
    // TODO: This assumes invoice always gets paid and that nothing can wrong :P.
    console.log('Invoice has been paid.');
  }
  if (request.type === 'notification') {
    const invoiceCode = request.options.invoiceCode;
    const decodedPayReq = await decodeInvoice(invoiceCode);
    const decodedInvoice = {
      invoiceCode,
      description: decodedPayReq.description,
      amount: decodedPayReq.num_satoshis,
    };
    // Instead of asking for user confirmation we'll go straight ahead and just pay it.
    if (decodedPayReq.num_satoshis > MAX_AUTO_PAY_AMOUNT) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'confirm_decoded_invoice',
            decodedInvoice,
          }, () => {});
        }
      });
    } else {
      await payInvoice(invoiceCode);
    }
  }
  if (request.type === 'settings_updated') {
    try {
      const info = await getInfo();
      console.log('info is', info);
      chrome.runtime.sendMessage({type: 'settings_verified', info});
    } catch(e) {
      console.log('sending message settings_error');
      chrome.runtime.sendMessage({type: 'settings_error', error: e});
    }
  }
};

chrome.runtime.onMessage.addListener(onMessage);

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({})],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  chrome.tabs.create({active: true, url: 'dist/dashboard.html'});
});
