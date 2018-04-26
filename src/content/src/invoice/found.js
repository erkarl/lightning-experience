export const invoiceFound = (invoiceCode) => {
  console.log('invoiceFound', invoiceCode);
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
