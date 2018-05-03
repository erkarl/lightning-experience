import React, { Component } from 'react';
import {
  App,
  Label,
  Input,
  Button,
} from './styles';

class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // TODO: Change this back to default 8080
      restlisten: 'https://localhost:8081',
      hexMacaroon: '',
    };
  }

  saveSettings() {
    const hexMacaroon = this.state.hexMacaroon;
    const restlisten = this.state.restlisten;
    console.log('saveSettings', restlisten, hexMacaroon);
    chrome.storage.sync.set({restlisten, hexMacaroon}, () => {
      console.log("Successfully updated settings.");
      chrome.runtime.sendMessage({type: "settings_updated"});
    });
  }

  updateRestlisten(e) {
    const restlisten = e.target.value;
    this.setState({...this.state, restlisten})
  }

  updateMacaroon(e) {
    // TODO: Add error catching.
    const file = e.target.files[0];
    const fileReader = new FileReader();
    const buf2hex = (buffer) => {
      return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    };
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
      const hexMacaroon = buf2hex(fileReader.result);
      this.setState({...this.state, hexMacaroon})
    };
  }

  render() {
    return (
      <App>
        <h1>Settings</h1>
        <hr />
        <div>
          <Label htmlFor="restlisten">
            LND restlisten:
          </Label>
          <Input
            type="text"
            name="restlisten"
            placeholder="localhost:8080"
            onChange={this.updateRestlisten.bind(this)}
            value={this.state.restlisten}
          />
          <Label htmlFor="macaroon">LND macaroon: </Label>
          <Input
            type="file"
            name="macaroon"
            onChange={this.updateMacaroon.bind(this)}
          />
          <Button onClick={this.saveSettings.bind(this)}>
            Save
          </Button>
        </div>
      </App>
    );
  }
}

export default AppComponent;
