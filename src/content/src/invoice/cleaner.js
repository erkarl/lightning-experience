export const cleanInvoice = (possibleInvoice) => {
  const lightningInvoiceRegex = /ln(?<chain>tb|tl|bc|ltc)(?<amt>[0-9]+)(?<multiplier>[munp])1(?<bechinvoice>[qpzry9x8gf2tvdw0s3jn54khce6mua7l]+)/g;
  const cleanedInvoices = possibleInvoice.match(lightningInvoiceRegex);
  if (cleanedInvoices && cleanedInvoices.length)
    return cleanedInvoices;
  return '';
};
