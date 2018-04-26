export const matchesInvoiceCode = (possibleCode) => {
  return possibleCode.includes('lntb')
    || possibleCode.includes('lnbc');
};

