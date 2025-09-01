import React from 'react';
import styled from 'styled-components';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  min-height: 400px;
  text-align: center;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(220, 20, 60, 0.1) 100%);
  border-radius: 12px;
  border: 1px solid rgba(220, 20, 60, 0.3);
`;

const ErrorIcon = styled(AlertCircle)`
  color: #dc143c;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  color: #dc143c;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ErrorText = styled.p`
  color: #cdbe91;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const RetryButton = styled.button`
  background: linear-gradient(45deg, #c89b3c, #f0e6d2);
  border: none;
  color: #0f2027;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(200, 155, 60, 0.4);
  }
`;

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  showRetry = false 
}) => {
  return (
    <ErrorContainer>
      <ErrorIcon size={64} />
      <ErrorTitle>Oops! Algo deu errado</ErrorTitle>
      <ErrorText>{message}</ErrorText>
      {showRetry && onRetry && (
        <RetryButton onClick={onRetry}>
          <RefreshCw size={18} />
          Tentar Novamente
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

export default ErrorMessage;
