export const invoiceFound = (invoiceCode) => {
  console.log('invoiceFound', invoiceCode);
  chrome.storage.sync.get('currentInvoice', (data) => {
    const shouldOverrideOldInvoice = invoiceCode !== data.currentInvoice;
    if (shouldOverrideOldInvoice) {
      console.log('Found invoice. Decoding...', invoiceCode);

      chrome.storage.sync.set({currentInvoice: invoiceCode}, () => {
        console.log("Current invoice has been changed.");
      });

      // TODO: This should be within storage.set callback?
      chrome.runtime.sendMessage({type: "notification", options: {invoiceCode}});
    }

  });
};
