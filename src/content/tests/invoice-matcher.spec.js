// const sum = require('./sum');
import {matchesInvoiceCode} from '../src/invoice-detector/invoice-matcher';

test('fails', () => {
  matchesInvoiceCode();
  expect(true).toEqual(false);
});
