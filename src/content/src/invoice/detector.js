import { matchesInvoiceCode } from './matcher';
import { cleanInvoice } from './cleaner';

const TARGET_ELEMENT = document.body;
const MUTATION_OBSERVER_CONFIG = {
  characterData: false,
  attributes: false,
  childList: true,
  subtree: true,
};

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const searchForInvoices = ({invoiceFound}) => {
  const mutationObserver = new MutationObserver((mutationsList) => {
    const invoices = mutationsList
      .filter((mutation) => {
        return mutation
          && mutation.target
          && mutation.target.textContent
          && matchesInvoiceCode(mutation.target.textContent);
      })
      .map((mutation) => mutation.target.textContent)
      .map(cleanInvoice)
      .filter(onlyUnique);
    invoices.forEach(invoiceFound);
  });
  mutationObserver.observe(TARGET_ELEMENT, MUTATION_OBSERVER_CONFIG);
  return mutationObserver;
};
