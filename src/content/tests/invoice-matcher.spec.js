import {matchesInvoiceCode} from '../src/invoice/matcher';

test('returns false for "Generating Invoice"', () => {
  const matches = matchesInvoiceCode("Generating Invoice");
  expect(matches).toEqual(false);
});

test('returns true for testnet invoice code', () => {
  const validInvoiceCode = "lntb10n1pdwrejspp578k5hz6fzdgg5n7uvyfst6amsa8p9x4pmyp8xq0krdnlyvkgsz4qdqqcqzys4z8sjnln7h83rxjjj6zsaqhq8kyn8f9mkxadtwnf5m9ven0uput5tynhjh7eu8ree58qxs440t370930sjfwe0wusgaz9tsnw6qfw7spgdrsf0"
  const matches = matchesInvoiceCode(validInvoiceCode);
  expect(matches).toEqual(true);
});

test('returns true for mainnet invoice code', () => {
  const validInvoiceCode = "lnbc10n1pdwrmnapp5qmg7yc7ms8jl56yee6a6kd469av0larw4s63kl4umq0pq908nqjqdqqcqzysx0qjs7lhvxe8nxtyhvj6ywf45jx47vx79y5cykvyv06rtv4hphqzzug75ajqj4kkghzruvamc3dr0fr8y3zxjm36en9knm6zyxs9xwsqk2slq2"
  const matches = matchesInvoiceCode(validInvoiceCode);
  expect(matches).toEqual(true);
});
