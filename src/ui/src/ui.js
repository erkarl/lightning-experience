import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

export const initUI = (decodedInvoice) => {
  const rootLE = document.getElementById('app-root');
  document.body.append(rootLE);
  ReactDOM.render(<App />, rootLE);
  console.log('UI started');
};

