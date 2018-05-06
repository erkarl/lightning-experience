import React, { Component } from 'react';

class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openInvoice: true,
      paid: false,
    };
  }

  render() {
    const {
      invoiceCode,
      description,
      amount,
    } = this.props.decodedInvoice;
    return (
      <div className="le-widget-container">
        {!this.state.openInvoice && !this.state.paid &&
          <button onClick={() => {
            this.setState({...this.state, openInvoice: true})
          }}>
            Pay with LE
          </button>
        }
        {this.state.openInvoice &&
          <div className="le-invoice-container">
            <p>Invoice</p>
            <p>Amount: {amount}</p>
            {description &&
              <p>Description: {description}</p>
            }
            <button onClick={() => {
              chrome.runtime.sendMessage({type: "pay_invoice", options: {
                invoiceCode,
              }});
              this.setState({...this.state,
                paid: true,
                openInvoice: false,
              });
            }}>
              Pay Invoice
            </button>
          </div>
        }
      </div>
    );
  }
}

export default AppComponent;
