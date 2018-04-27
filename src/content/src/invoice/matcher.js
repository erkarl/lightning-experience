export const matchesInvoiceCode = (possibleCode) => {
  // TODO: Improve with regex.
  // https://regex101.com/r/zUN6mf/3
  return possibleCode
    && (possibleCode.includes('lntb')
    || possibleCode.includes('lnbc'));
};

