import {cleanInvoice} from '../src/invoice-detector/invoice-cleaner';

test('returns true for testnet invoice code', () => {
  const dirtyInvoice = "lntb10n1pdwrejspp578k5hz6fzdgg5n7uvyfst6amsa8p9x4pmyp8xq0krdnlyvkgsz4qdqqcqzys4z8sjnln7h83rxjjj6zsaqhq8kyn8f9mkxadtwnf5m9ven0uput5tynhjh7eu8ree58qxs440t370930sjfwe0wusgaz9tsnw6qfw7spgdrsf0"
  const cleanedInvoice = cleanInvoice(dirtyInvoice);
  const expectedInvoice = 'lntb10n1pdwrm54pp50gndftg433kafrtmfvsvltfmhyxpq2k2zvrtz0gcc8cfmg6gh34qdqqcqzyspkuxsjh5yrwkqzjnu485p4vcp0x0waemk7rglyjx8fp9vwf05ew8wj0c2addumurpdlp6qwu942e9r8ykr5xjjppd2q83lk4xfkef6gpaz52k2';
  expect(cleanedInvoice).toEqual(expectedInvoice);
});
