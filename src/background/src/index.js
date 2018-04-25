console.log('Starting background bundle');

const payInvoice = (invoiceCode) => {
  const body = {
    "dest_string": "03b1e8cae2c4156cd94311be762dcaf62d5afd2e4b49162721c9e79bca33c76d0d",
    "payment_request": invoiceCode
    // "payment_request": "lntb1500n1pddck5tpp54ecxycjhd3qad296qsmkers43wsyvt2dsv59w3xgca0swsa3lajsdqqcqzysrnydpct6uym9ydmnt2gm2ct33u7spf2q09z3axfm623cfl22zgp30vwadge2pgnfql74x7s4vx5tysft9aga7qya9nc4n8gklcjrcusqjdstze"
  };
  return fetch('https://localhost:8081/v1/channels/transactions', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log('response is', response);
      if (!response.ok) {
        return Promise.reject('failed_to_pay_invoice');
      }
      return Promise.resolve(response.json());
    }, (e) => {
      console.error('Failed to fetch: ', e);
    });
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'localhost'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

console.log('Adding external message listener...');
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.type === 'pay_invoice') {
      payInvoice(request.options.invoiceCode)
        .then((lndResponse) => {
          console.log('lndResponse is', lndResponse);
        }).then(() => {
          // TODO: This assumes invoice always gets paid and there are no routing errors :D.
          console.log('Invoice has been paid.');
        });
    }
    if (request.type == "notification") {
      console.log('blabla notifications.create.request', request);
      console.log('blabla notifications.create.sender', sender);
      console.log('invoice code is', request.options.invoiceCode);
      // TODO: Actually decode the invoice.
      const decodedInvoice = {
        description: 'Payment description.',
        amount: 150,
      };
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log('Sending message to gateway.', tabs);
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "confirm_decoded_invoice",
            decodedInvoice,
          }, function(response) {});
        }
      });
    }
});
