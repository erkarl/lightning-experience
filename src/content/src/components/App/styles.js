import styled, {keyframes} from 'styled-components';

const bounceInRight = keyframes`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }

  75% {
    transform: translate3d(10px, 0, 0);
  }

  90% {
    transform: translate3d(-5px, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

export const App = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-bottom-left-radius: 0.4375rem;
  max-width: 14rem;
  animation: ${bounceInRight} 400ms linear;
  border: 0.25px solid #a2a2a2;
`;

export const OpenInvoice = styled.div`
  padding: 1rem;
`;
