import React, { Component } from 'react';
import {
  App,
  OpenInvoice,
} from './styles';

class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openInvoice: false,
      paid: false,
    };
  }

  render() {
    return (
      <App>
        {!this.state.openInvoice && !this.state.paid &&
          <button onClick={() => {
            this.setState({...this.state, openInvoice: true})
          }}>
            Pay with LE
          </button>
        }
        {this.state.openInvoice &&
          <OpenInvoice>
            <p>Invoice</p>
            <p>Amount: 150</p>
            <button onClick={() => {
              console.log('payInvoice', this.props.invoiceCode);
              chrome.runtime.sendMessage({type: "pay_invoice", options: {
                invoiceCode: this.props.invoiceCode,
              }});
              this.setState({...this.state,
                paid: true,
                openInvoice: false,
              });
            }}>
              Pay Invoice
            </button>
          </OpenInvoice>
        }
      </App>
    );
  }
}

export default AppComponent;
