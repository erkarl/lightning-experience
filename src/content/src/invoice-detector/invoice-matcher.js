export const matchesInvoiceCode = (possibleCode) => {
  console.log('possibleCode', possibleCode);
  return possibleCode.includes('lntb')
    || possibleCode.includes('lnbc');
};

