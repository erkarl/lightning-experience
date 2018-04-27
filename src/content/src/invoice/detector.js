import { cleanInvoice } from './cleaner';
import { filterMutation } from './filter';

const TARGET_ELEMENT = document.body;
const MUTATION_OBSERVER_CONFIG = {
  characterData: true,
  attributes: true,
  childList: true,
  subtree: true,
};

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const notEmptyNorNull = (value) => {
  return value || false;
};

export const searchForInvoices = ({invoiceFound}) => {
  const mutationObserver = new MutationObserver((mutationsList) => {
    const filteredMutations = mutationsList
      .map(filterMutation)
    const invoices = [].concat.apply([], filteredMutations)
      .map(cleanInvoice)
      .filter(onlyUnique)
      .filter(notEmptyNorNull);
    invoices.forEach(invoiceFound);
  });
  mutationObserver.observe(TARGET_ELEMENT, MUTATION_OBSERVER_CONFIG);
  return mutationObserver;
};
