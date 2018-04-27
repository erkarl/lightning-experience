import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

export const initWidget = () => {
  const rootLE = document.createElement('div');
  const guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
  rootLE.id = guid();
  rootLE.style.position = 'absolute';
  rootLE.style.top = `0px`;
  rootLE.style.right = `0px`;
  document.body.append(rootLE);
  // TODO: It currently naively assumes there is only 1 invoice on the page. For proof of concept this will do.
  chrome.storage.sync.get('currentInvoice', (data) => {
    console.log('rendering widget with invoice code', data.currentInvoice);
    ReactDOM.render(<App invoiceCode={data.currentInvoice} />, rootLE);
    console.log('Widget injected.');
  });
};

