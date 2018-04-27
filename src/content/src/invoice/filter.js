import { matchesInvoiceCode } from './matcher';

const ATTRS_TO_SCAN = ['href', 'textContent'];

export const filterMutation = (mutation) => {
  return ATTRS_TO_SCAN
    .map((attr) => {
      return matchesInvoiceCode(mutation.target[attr])
        ? mutation.target[attr]
        : false
    })
    .filter(targetAttr => targetAttr);
};

