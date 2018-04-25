import React, { Component } from 'react';
import {
  App,
  OpenInvoice,
  // LightningIcon,
} from './styles';
// import icon from './icon.svg';

class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openInvoice: false,
      paid: false,
    };
  }

  render() {
    // console.log('FU', icon);
    console.log('rerender', this.props);
    return (
      <App>
        {!this.state.openInvoice && !this.state.paid &&
          <button onClick={() => {
            console.log('onClick');
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
