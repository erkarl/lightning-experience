let currentInvoices = [];

export const invoiceFound = (invoiceCode) => {
  const shouldSendToBackgroundScript = !currentInvoices
    .includes(invoiceCode);
  if (shouldSendToBackgroundScript) {
    currentInvoices = currentInvoices
      .slice(0, 30)
      .concat([invoiceCode]);
    console.log('invoiceFound', invoiceCode);
    chrome.runtime.sendMessage({type: "notification", options: {invoiceCode}});
  } else {
    console.log('INVOICE IGNORED!');
  }
  /*
  chrome.storage.sync.get('currentInvoices', (data) => {
    const currentInvoices = data.currentInvoices || [];
    const shouldSendToBackgroundScript = !currentInvoices
      .includes(invoiceCode);
    if (shouldSendToBackgroundScript) {
      console.log('Decoding invoice...', invoiceCode);
      chrome.storage.sync.set({
        currentInvoices: currentInvoices.concat([invoiceCode])
      }, () => {
        console.log('Sent to background...');
        chrome.runtime.sendMessage({type: "notification", options: {invoiceCode}});
      });

    }
  });
  */
};
