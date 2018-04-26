console.log('Starting background bundle');

const LND_RESTLISTEN = 'https://localhost:8081';
const TRANSACTIONS_ENDPOINT = '/v1/channels/transactions';

const payInvoice = (invoiceCode) => {
  const body = {
    "dest_string": "03b1e8cae2c4156cd94311be762dcaf62d5afd2e4b49162721c9e79bca33c76d0d",
    "payment_request": invoiceCode
  };
  return fetch(`${LND_RESTLISTEN}${TRANSACTIONS_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log('response is', response);
      if (!response.ok) {
        return Promise.reject('failed_to_pay_invoice');
      }
      return Promise.resolve(response.json());
    }, (e) => {
      console.error('Failed to fetch: ', e);
    });
};

console.log('Adding external message listener...');
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.type === 'pay_invoice') {
      payInvoice(request.options.invoiceCode)
        .then((lndResponse) => {
          console.log('lndResponse is', lndResponse);
        }).then(() => {
          // TODO: This assumes invoice always gets paid and that nothing can wrong :P.
          console.log('Invoice has been paid.');
        });
    }
    if (request.type == "notification") {
      // TODO: Actually decode the invoice.
      const decodedInvoice = {
        description: 'Payment description.',
        amount: 150,
      };
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log('Sending message to gateway.', tabs);
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "confirm_decoded_invoice",
            decodedInvoice,
          }, (response) => {});
        }
      });
    }
});
