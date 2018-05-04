const TRANSACTIONS_ENDPOINT = '/v1/channels/transactions';
const PAY_REQ_ENDPOINT = '/v1/payreq';
const GET_INFO_ENDPOINT = '/v1/getinfo';
/*
const LND_RESTLISTEN = 'https://localhost:8081';
const ADMIN_MACAROON_HEX = '0201036c6e6402bb01030a106f5958baca6a8a0c0d14cd71a7701e461201301a160a0761646472657373120472656164120577726974651a130a04696e666f120472656164120577726974651a170a08696e766f69636573120472656164120577726974651a160a076d657373616765120472656164120577726974651a170a086f6666636861696e120472656164120577726974651a160a076f6e636861696e120472656164120577726974651a140a0570656572731204726561641205777269746500000620d63e09ed4e2701c9996734220b3c49956a0b99a78aa090a50c833e2badddc931';
*/

const getHeaders = (hexMacaroon) => {
  return {
    'Content-Type': 'application/json',
    'Grpc-Metadata-macaroon': hexMacaroon,
  };
};

const getHexMacaroon = () => {
  console.log('getMacaroonHex');
  return new Promise((resolve) => {
    chrome.storage.sync.get('hexMacaroon', (data) => {
      console.log('get hexMacaroon', data.hexMacaroon);
      resolve(data.hexMacaroon);
    });
  });
};

const getRestlistenURL = () => {
  console.log('getRestlistenURL');
  return new Promise((resolve) => {
    chrome.storage.sync.get('restlisten', (data) => {
      console.log('get restlisten', data.restlisten);
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
    return Promise.reject('failed_to_get_info');
  }
  return Promise.resolve(response.json());
};

