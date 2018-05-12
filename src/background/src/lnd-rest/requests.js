const TRANSACTIONS_ENDPOINT = '/v1/channels/transactions';
const PAY_REQ_ENDPOINT = '/v1/payreq';
const GET_INFO_ENDPOINT = '/v1/getinfo';

const getHeaders = (hexMacaroon) => {
  return {
    'Content-Type': 'application/json',
    'Grpc-Metadata-macaroon': hexMacaroon,
  };
};

const getHexMacaroon = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('hexMacaroon', (data) => {
      resolve(data.hexMacaroon);
    });
  });
};

const getRestlistenURL = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('restlisten', (data) => {
      resolve(data.restlisten);
    });
  });
};

const payInvoiceRequest = ({body, restlisten, hexMacaroon}) => {
  return fetch(`${restlisten}${TRANSACTIONS_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: getHeaders(hexMacaroon),
  });
};

const decodeInvoiceRequest = ({payReq, restlisten, hexMacaroon}) => {
  return fetch(`${restlisten}${PAY_REQ_ENDPOINT}/${payReq}`, {
    method: 'GET',
    headers: getHeaders(hexMacaroon),
  });
};

const getInfoRequest = ({restlisten, hexMacaroon}) => {
  return fetch(`${restlisten}${GET_INFO_ENDPOINT}`, {
    method: 'GET',
    headers: getHeaders(hexMacaroon),
  });
};

export const decodeInvoice = async (payReq) => {
  const restlisten = await getRestlistenURL();
  const hexMacaroon = await getHexMacaroon();
  const response = await decodeInvoiceRequest({payReq, restlisten, hexMacaroon});
  if (!response.ok) {
    return Promise.reject('failed_decodeInvoice');
  }
  return Promise.resolve(response.json());
};

export const payInvoice = async (invoiceCode) => {
  const restlisten = await getRestlistenURL();
  const hexMacaroon = await getHexMacaroon();
  const body = {
    'payment_request': invoiceCode
  };
  const response = await payInvoiceRequest({body, restlisten, hexMacaroon});
  if (!response.ok) {
    return Promise.reject('failed_to_pay_invoice');
  }
  return Promise.resolve(response.json());
};

export const getInfo = async () => {
  const restlisten = await getRestlistenURL();
  const hexMacaroon = await getHexMacaroon();
  const response = await getInfoRequest({restlisten, hexMacaroon});
  if (!response.ok) {
    const failedResponseBody = await response.json();
    if (failedResponseBody.error) {
      return Promise.reject(failedResponseBody.error);
    }
    return Promise.reject('failed_to_get_info');
  }
  return Promise.resolve(response.json());
};

