import styled from 'styled-components';

export const BaseContainer = styled.div`
  width: 100%;
  opacity: 0.97;
  margin-top: 3rem;
  background: linear-gradient(to bottom right,#deafa0,#b1c8da);
`;

export const App = styled.div`
`;

export const MainTitle = styled.h1`
  margin: 0;
  font-size: 4rem;
  text-align: center;
  color: #222222;
  margin-top: 2rem;
`;

export const SmallHeading = styled.h3`
`;

export const Separator = styled.hr`
  color: rgba(17, 17, 17, 1);
  border-style: solid;
`;

export const Header = styled.h2`
  margin: 0;
  font-size: 2rem;
`;

export const SettingsArea = styled.div`
  width: 66%;
  margin: 0 auto;
  padding: 2rem;
`;

export const TestingSettings = styled.div`
  width: 66%;
  margin: 0 auto;
  padding: 2rem 0;
`;

export const TestingSettingsText = styled.div`
  text-align: center;
  font-size: 2rem;
  margin: 1rem;
`;

export const Label = styled.label`
  display: block;
  width: 100%;
  font-size: 1.25rem;
  margin: 1rem 0 1rem 0;
`;

export const Input = styled.input`
  border: none;
  font-weight: 200;
  outline-color: white;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  background: #e7e7e7;
  color: rgba(17,17,17,1);
`;

export const Button = styled.button`
  display: block;
  font-size: 1.5rem;
  color: rgba(17,17,17,1);
  border: none;
  background-color: #f56c40;
  padding: 0.5rem 1.5rem;
`;

export const SaveButton = styled(Button)`
  font-weight: 600;
`;

export const FileInputButton = styled(Button)`
  width: 100%
  height: 100%;
  font-size: 1rem;
`;

export const LightningImg = styled.img`
  z-index: -1;
  position: fixed;
  right: -5rem;
  transform: rotateY(180deg);
`;

export const UploadMacaroonIcon = styled.img`
  width: 3rem;
`;

export const SettingsErrorContainer = styled.div`
`;

export const ErrorTextContainer = styled.div`
  display: flex;
`;

export const InfoContainer = styled(BaseContainer)`
`;

export const LoadingSpinner = styled.div.attrs({
  className: 'loading-spinner',
})`
`;

export const ErrorText = styled.div`
  text-align: left;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

export const InfoText = styled.div`
  text-align: left;
  padding: 1rem;
  font-size: 1rem;
`;

export const FileInputWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  position: relative;
`;

export const FileInput = styled.input`
  width: 100%;
  height: 8rem;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
`;

export const TextArea = styled.textarea`
  width: calc(100% - 10.5rem);
  margin-left: 2.5rem;
  font-size: 0.9rem;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  resize: none;
  outline-color: white;
  font-weight: 200;
  border: none;
  background: #e7e7e7;
  color: rgba(17,17,17,1);
  ::placeholder {
    font-weight: 100;
    color: rgba(17,17,17,1);
  }
`;

export const MacaroonRow = styled.div`
  display: flex;
`;

export const ActionButtons = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;
