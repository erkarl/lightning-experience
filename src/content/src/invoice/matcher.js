export const matchesInvoiceCode = (possibleCode) => {
  return possibleCode
    && (possibleCode.includes('lntb')
    || possibleCode.includes('lnbc'));
};

