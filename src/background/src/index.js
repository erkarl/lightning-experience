console.log('Starting background bundle');

const LND_RESTLISTEN = 'https://localhost:8081';
const TRANSACTIONS_ENDPOINT = '/v1/channels/transactions';
const PAY_REQ_ENDPOINT = '/v1/payreq';

const payInvoiceRequest = (body) => {
  return fetch(`${LND_RESTLISTEN}${TRANSACTIONS_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const decodeInvoiceRequest = (payReq) => {
  return fetch(`${LND_RESTLISTEN}${PAY_REQ_ENDPOINT}/${payReq}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const decodeInvoice = async (payReq) => {
  const response = await decodeInvoiceRequest(payReq);
  console.log('response is', response);
  if (!response.ok) {
    return Promise.reject('failed_decodeInvoice');
  }
  return Promise.resolve(response.json());
};

const payInvoice = async (invoiceCode) => {
  const body = {
    'payment_request': invoiceCode
  };
  const response = await payInvoiceRequest(body);
  console.log('response is', response);
  if (!response.ok) {
    return Promise.reject('failed_to_pay_invoice');
  }
  return Promise.resolve(response.json());
};

console.log('Adding external message listener...');
chrome.runtime.onMessage.addListener(async (request/*, sender */) => {
  // TODO: Make sure sender is whitelisted and reject by default.
  if (request.type === 'pay_invoice') {
    payInvoice(request.options.invoiceCode)
      .then((lndResponse) => {
        console.log('lndResponse is', lndResponse);
      }).then(() => {
        // TODO: This assumes invoice always gets paid and that nothing can wrong :P.
        console.log('Invoice has been paid.');
      });
  }
  if (request.type == 'notification') {
    const invoiceCode = request.options.invoiceCode;
    const decodedPayReq = await decodeInvoice(invoiceCode);
    const decodedInvoice = {
      description: decodedPayReq.description,
      amount: decodedPayReq.num_satoshis,
    };
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log('Sending message to gateway.', tabs);
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'confirm_decoded_invoice',
          decodedInvoice,
        }, () => {});
      }
    });
  }
});
