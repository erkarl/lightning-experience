import styled from 'styled-components';

export const BaseContainer = styled.div`
  width: 66%;
  margin: 0 auto;
  border: 1px solid #fff;
  margin-top: 3rem;
  background: #222222;
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

export const Header = styled.h2`
  margin: 0;
  font-size: 2rem;
`;

export const SettingsArea = styled.div`
  padding: 2rem;
`;

export const TestingSettings = styled.div`
  text-align: center;
  font-size: 2rem;
  margin: 1rem;
`;

export const Label = styled.label`
  display: block;
  width: 100%;
  margin: 1rem 0 1rem 0;
`;

export const Input = styled.input`
  width: 100%;
`;

export const Button = styled.button`
  display: block;
  height: 2rem;
  font-size: 1.5rem;
  margin-top: 1rem;
  background: #ffa200;
  color: black;
  border: 1px solid white;
`;

export const LightningImg = styled.img`
  z-index: -1;
  position: absolute;
  right: -10rem;
  transform: rotateY(180deg);
`;

export const SettingsErrorContainer = styled(BaseContainer)`
`;

export const InfoContainer = styled(BaseContainer)`
`;

export const LoadingSpinner = styled.div.attrs({
  className: 'loading-spinner',
})`
`;

export const ErrorText = styled.div`
  text-align: left;
  padding: 1rem;
  font-size: 1rem;
`;

export const InfoText = styled.div`
  text-align: left;
  padding: 1rem;
  font-size: 1rem;
`;
