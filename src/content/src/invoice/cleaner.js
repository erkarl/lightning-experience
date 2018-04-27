// const LIGHTNING_INVOICE_LENGTH = 188;

export const cleanInvoice = (dirtyInvoice) => {
  const lightningInvoiceRegex = /ln(?<chain>tb|tl|bc|ltc)(?<amt>[0-9]+)(?<multiplier>[munp])1(?<bechinvoice>[qpzry9x8gf2tvdw0s3jn54khce6mua7l]+)/g;
  const cleanedInvoice = dirtyInvoice.match(lightningInvoiceRegex);
  if (cleanInvoice.length !== 1) {
    console.warn(`Unable to clean dirtyInvoice ${dirtyInvoice}`);
    return '';
  }
  return cleanedInvoice.shift();
};
