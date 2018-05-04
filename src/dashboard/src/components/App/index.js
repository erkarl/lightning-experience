import React, { Component } from 'react';
import LightningSVG from './lightning.svg';

import {
  App,
  MainContainer,
  Label,
  Input,
  Button,
  SettingsArea,
  Header,
  LightningImg,
  MainTitle,
  TestingSettings,
  LoadingSpinner,
} from './styles';

class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restlisten: 'https://localhost:8080',
      hexMacaroon: '',
      isVerifying: false,
    };
  }

  saveSettings() {
    const hexMacaroon = this.state.hexMacaroon;
    const restlisten = this.state.restlisten;
    console.log('saveSettings', restlisten, hexMacaroon);
    chrome.storage.sync.set({restlisten, hexMacaroon}, () => {
      console.log("Successfully updated settings.");
      chrome.runtime.sendMessage({type: "settings_updated"});
      // alert('Settings have been saved.');
      this.setState({...this.state, isVerifying: true});
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
        <LightningImg src={LightningSVG} alt="Lightning" />
        <MainTitle>
          Lightning Experience
        </MainTitle>
        <MainContainer>
          {!this.state.isVerifying &&
            <SettingsArea>
              <Header>Settings</Header>
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
            </SettingsArea>
          }
          {this.state.isVerifying &&
            <TestingSettings>
              Testing connectivity to LND. Please wait.
            </TestingSettings>
          }
          {this.state.isVerifying &&
            <LoadingSpinner />
          }
        </MainContainer>
      </App>
    );
  }
}

export default AppComponent;
