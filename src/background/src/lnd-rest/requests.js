const LND_RESTLISTEN = 'https://localhost:8081';
const TRANSACTIONS_ENDPOINT = '/v1/channels/transactions';
const PAY_REQ_ENDPOINT = '/v1/payreq';
const ADMIN_MACAROON_HEX = '0201036c6e6402bb01030a106f5958baca6a8a0c0d14cd71a7701e461201301a160a0761646472657373120472656164120577726974651a130a04696e666f120472656164120577726974651a170a08696e766f69636573120472656164120577726974651a160a076d657373616765120472656164120577726974651a170a086f6666636861696e120472656164120577726974651a160a076f6e636861696e120472656164120577726974651a140a0570656572731204726561641205777269746500000620d63e09ed4e2701c9996734220b3c49956a0b99a78aa090a50c833e2badddc931';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Grpc-Metadata-macaroon': ADMIN_MACAROON_HEX,
  };
};

const payInvoiceRequest = (body) => {
  return fetch(`${LND_RESTLISTEN}${TRANSACTIONS_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: getHeaders(),
  });
};

const decodeInvoiceRequest = (payReq) => {
  return fetch(`${LND_RESTLISTEN}${PAY_REQ_ENDPOINT}/${payReq}`, {
    method: 'GET',
    headers: getHeaders(),
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

