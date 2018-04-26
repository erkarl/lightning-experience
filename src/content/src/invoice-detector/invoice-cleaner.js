const LIGHTNING_INVOICE_LENGTH = 188;

export const cleanInvoice = (dirtyInvoice) => {
  const invoiceStartIndex = dirtyInvoice.indexOf('lntb');
  const invoiceCode = dirtyInvoice.slice(
    invoiceStartIndex,
    invoiceStartIndex + LIGHTNING_INVOICE_LENGTH
  );
  if (invoiceCode.length === 188) {
    return invoiceCode;
  }
  // TODO: Quickly fall back to mainnet in order to get the PoC ready.

  const mainnetInvoiceStartIndex = dirtyInvoice.indexOf('lnbc');
  const mainnetInvoiceCode = dirtyInvoice.slice(
    mainnetInvoiceStartIndex,
    mainnetInvoiceStartIndex + LIGHTNING_INVOICE_LENGTH
  );

  return mainnetInvoiceCode;
};

