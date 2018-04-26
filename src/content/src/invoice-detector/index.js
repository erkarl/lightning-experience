import { matchesInvoiceCode } from './invoice-matcher';
import { cleanInvoice } from './invoice-cleaner';
const TARGET_ELEMENT = document.body;
const MUTATION_OBSERVER_CONFIG = {
  characterData: false,
  attributes: false,
  childList: true,
  subtree: true,
};

const domMutationDetected = (mutationsList) => {
  console.log('domMutationDetected', mutationsList);
  const invoices = mutationsList
    .filter((mutation) => {
      return mutation
        && mutation.target
        && mutation.target.textContent
        && matchesInvoiceCode(mutation.target.textContent);
    })
    .map(cleanInvoice);
  console.log('invoices', invoices.length);
};

export const searchForInvoices = ({invoiceFound}) => {
  console.log('searchForInvoices', TARGET_ELEMENT);
  const mutationObserver = new MutationObserver(domMutationDetected);
  mutationObserver.observe(TARGET_ELEMENT, MUTATION_OBSERVER_CONFIG);
  return mutationObserver;
};
