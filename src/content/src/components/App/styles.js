import styled, {keyframes} from 'styled-components';

export const App = styled.div`
`;

const shake = keyframes`
  0% {
    width: 1rem;
  }

  50% {
    width: 1.5rem;
  }

  100% {
    width: 1rem;
  }
`;

export const LightningIcon = styled.img`
  cursor: pointer;
  width: 1rem;
  animation: ${shake} 2s linear infinite;
`;

export const OpenInvoice = styled.div`
  position: relative;
  left: 5.75rem;
  padding: 1rem;
  border: 1px dotted #001a5f;
`;
