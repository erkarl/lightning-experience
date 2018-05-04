import React, { Component } from 'react';
import LightningSVG from './lightning.svg';

import {
  App,
  BaseContainer,
  SettingsErrorContainer,
  Label,
  Input,
  Button,
  SettingsArea,
  Header,
  LightningImg,
  MainTitle,
  TestingSettings,
  LoadingSpinner,
  ErrorText,
  InfoContainer,
  InfoText,
} from './styles';

class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restlisten: 'https://localhost:8080',
      hexMacaroon: '',
      isVerifying: false,
    };
    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'settings_verified') {
        this.setState({...this.state,
          info: request.info,
          isVerifying: false,
        });
      }
      if (request.type === 'settings_error') {
        this.setState({...this.state,
          settingsError: request.error,
          isVerifying: false,
        });
      }
    });
  }

  saveSettings() {
    const hexMacaroon = this.state.hexMacaroon;
    const restlisten = this.state.restlisten;
    chrome.storage.sync.set({restlisten, hexMacaroon}, () => {
      chrome.runtime.sendMessage({type: "settings_updated"});
      this.setState({...this.state, isVerifying: true, settingsError: ''});

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
        {this.state.info &&
          <InfoContainer>
            <InfoText>
              Info is: TODO
            </InfoText>
          </InfoContainer>
        }
        {this.state.settingsError &&
          <SettingsErrorContainer>
            <ErrorText>
              Failed to connect to LND: {this.state.settingsError}
            </ErrorText>
          </SettingsErrorContainer>
        }
        <BaseContainer>
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
        </BaseContainer>
      </App>
    );
  }
}

export default AppComponent;
