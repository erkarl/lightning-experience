import React, { Component } from 'react';
import LightningSVG from './lightning.svg';
import ArrowUpIcon from './arrow-circle-up.svg';

import {
  App,
  BaseContainer,
  SettingsErrorContainer,
  Label,
  Input,
  SettingsArea,
  Header,
  LightningImg,
  MainTitle,
  TestingSettings,
  LoadingSpinner,
  ErrorText,
  InfoContainer,
  InfoText,
  TextArea,
  FileInputWrapper,
  FileInput,
  FileInputButton,
  MacaroonRow,
  ActionButtons,
  Separator,
  SaveButton,
  UploadMacaroonIcon,
  TestingSettingsText,
  SmallHeading,
  SecondaryTitle,
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

  updateMacaroonText(e) {
    this.setState({...this.state, hexMacaroon: e.target.value});
  }

  render() {
    const info = this.state.info;
    return (
      <App>
        <LightningImg src={LightningSVG} alt="Lightning" />
        <MainTitle>
          Lightning Experience
        </MainTitle>
        <SecondaryTitle>
          Developer Preview
        </SecondaryTitle>
        {this.state.info &&
          <InfoContainer>
            <InfoText>
              Alias: {info.alias}
              Best header timestamp: {info.best_header_timestamp}
              Block hash: {info.block_hash}
              Block height: {info.block_height}
              Chains:
              {info.chains && info.chains.map((chain) => {
                return <div key={chain}>{chain}</div>
              })}
              Public key: {info.identity_pubkey}
              Active channels: {info.num_active_channels}
              Synced to chain: {info.synced_to_chain}
              Peers: {info.num_peers}
              URIs:
              {info.uris && info.uris.map((uri) => {
                return <div key={uri}>{uri}</div>
              })}
            </InfoText>
          </InfoContainer>
        }
        <BaseContainer>
          {!this.state.isVerifying &&
            <SettingsArea>
              <Header>Settings</Header>
              <Separator />
              {this.state.settingsError &&
                <SettingsErrorContainer>
                  <SmallHeading>Error</SmallHeading>
                  <ErrorText>
                    Failed to connect to LND: {this.state.settingsError}
                  </ErrorText>
                  <Separator />
                </SettingsErrorContainer>
              }
              <div>
                <Label htmlFor="restlisten">LND restlisten</Label>
                <Input
                  type="text"
                  name="restlisten"
                  placeholder="localhost:8080"
                  onChange={this.updateRestlisten.bind(this)}
                  value={this.state.restlisten}
                />
                <Label htmlFor="macaroon">LND macaroon</Label>
                <MacaroonRow>
                  <FileInputWrapper>
                    <FileInputButton>
                      <UploadMacaroonIcon src={ArrowUpIcon} alt="Upload macaroon" />
                      Upload Macaroon
                    </FileInputButton>
                    <FileInput
                      type="file"
                      name="macaroon"
                      onChange={this.updateMacaroon.bind(this)}
                    />
                  </FileInputWrapper>
                  <TextArea
                    placeholder="Paste in your hex encoded macaroon or upload from file"
                    type="textarea"
                    name="macaroon-text"
                    value={this.state.hexMacaroon}
                    onChange={this.updateMacaroonText.bind(this)}
                  />
                </MacaroonRow>
                <ActionButtons>
                  <SaveButton onClick={this.saveSettings.bind(this)}>
                    Save
                  </SaveButton>
                </ActionButtons>
              </div>
            </SettingsArea>
          }
          {this.state.isVerifying &&
            <TestingSettings>
              <TestingSettingsText>
                Testing connectivity to LND. Please wait.
              </TestingSettingsText>
              <LoadingSpinner />
            </TestingSettings>
          }
        </BaseContainer>
      </App>
    );
  }
}

export default AppComponent;
