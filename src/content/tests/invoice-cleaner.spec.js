import {cleanInvoice} from '../src/invoice/cleaner';

test('returns true for testnet invoice code', () => {
  const dirtyInvoice = "possibleCode Here is your invoicelntb10n1pdwruxupp5wtvhnve4yewz5a62r4e08kllc8m06qrk8tzzfmwk94gxfrc0v8tsdqqcqzysekkrq9uk2xcrxt78aweu2dkvqzcrf9gxs60dfuyuw7vg7ncu04rqmnam9u5g3jvmxfa900d8x2rc04w2scd2rc0smdg96u63ftnfe8qpuvgezq"
  const cleanedInvoice = cleanInvoice(dirtyInvoice);
  const expectedInvoice = "lntb10n1pdwruxupp5wtvhnve4yewz5a62r4e08kllc8m06qrk8tzzfmwk94gxfrc0v8tsdqqcqzysekkrq9uk2xcrxt78aweu2dkvqzcrf9gxs60dfuyuw7vg7ncu04rqmnam9u5g3jvmxfa900d8x2rc04w2scd2rc0smdg96u63ftnfe8qpuvgezq"
  expect(cleanedInvoice).toEqual(expectedInvoice);
});

test('returns true for mainnet invoice code', () => {
  const dirtyInvoice = "possibleCode Here is your invoicelnbc10n1pdwrunrpp5vss8vrvszz8fl29u4cw3pkphp8erc2ynpzhkd9z59d80ugwnrtlsdqqcqzys8s30thu4wmatppygvrs4je8gsjreh5r7fq44c40jpf3aragfflur7ypqavzcz7mfhcnev4x782kl9t5ksx3m8780ng0h9zmauhtssdsphtatff[12321[]"
  const cleanedInvoice = cleanInvoice(dirtyInvoice);
  const expectedInvoice = "lnbc10n1pdwrunrpp5vss8vrvszz8fl29u4cw3pkphp8erc2ynpzhkd9z59d80ugwnrtlsdqqcqzys8s30thu4wmatppygvrs4je8gsjreh5r7fq44c40jpf3aragfflur7ypqavzcz7mfhcnev4x782kl9t5ksx3m8780ng0h9zmauhtssdsphtatff";
  expect(cleanedInvoice).toEqual(expectedInvoice);
});

test('returns true for random yalls.org invoice code', () => {
  const dirtyInvoice = "lntb1500n1pdwxgplpp580pxsmp9g2h5y4k6tp88qx3xm23ammgccpzm2d5t3uj75k6anrhsdqa2fjkzep6ypnkja3qd4jjqmtpdejhjcqzysehxdvj56wm5rudgmg342g0wxs35kzrz9lt2utn0czye956u0kw0z6x9arxrcal6rdjxsdhfpjhwjdk4rv8pyymkddh3zw6cns5e6wegp5cyn3q"
  const cleanedInvoice = cleanInvoice(dirtyInvoice);
  const expectedInvoice = "lntb1500n1pdwxgplpp580pxsmp9g2h5y4k6tp88qx3xm23ammgccpzm2d5t3uj75k6anrhsdqa2fjkzep6ypnkja3qd4jjqmtpdejhjcqzysehxdvj56wm5rudgmg342g0wxs35kzrz9lt2utn0czye956u0kw0z6x9arxrcal6rdjxsdhfpjhwjdk4rv8pyymkddh3zw6cns5e6wegp5cyn3q";
  expect(cleanedInvoice).toEqual(expectedInvoice);
});
