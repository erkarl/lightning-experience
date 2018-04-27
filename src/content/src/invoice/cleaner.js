export const cleanInvoice = (possibleInvoice) => {
  const lightningInvoiceRegex = /ln(?<chain>tb|tl|bc|ltc)(?<amt>[0-9]+)(?<multiplier>[munp])1(?<bechinvoice>[qpzry9x8gf2tvdw0s3jn54khce6mua7l]+)/g;
  const cleanedInvoice = possibleInvoice.match(lightningInvoiceRegex);
  if (cleanedInvoice && cleanedInvoice.length)
    return cleanedInvoice.shift();
  return '';
};
