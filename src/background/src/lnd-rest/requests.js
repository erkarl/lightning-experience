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

export const decodeInvoice = async (payReq) => {
  const response = await decodeInvoiceRequest(payReq);
  if (!response.ok) {
    return Promise.reject('failed_decodeInvoice');
  }
  return Promise.resolve(response.json());
};

export const payInvoice = async (invoiceCode) => {
  const body = {
    'payment_request': invoiceCode
  };
  const response = await payInvoiceRequest(body);
  if (!response.ok) {
    return Promise.reject('failed_to_pay_invoice');
  }
  return Promise.resolve(response.json());
};

