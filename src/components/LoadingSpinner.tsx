import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader2 } from 'lucide-react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  min-height: 400px;
  text-align: center;
`;

const SpinnerIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
  color: #c89b3c;
  margin-bottom: 1rem;
`;

const SpinnerMessage = styled.p`
  color: #cdbe91;
  font-size: 1.1rem;
  margin: 0;
`;

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Carregando...", 
  size = 48 
}) => {
  return (
    <SpinnerContainer>
      <SpinnerIcon size={size} />
      <SpinnerMessage>{message}</SpinnerMessage>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
