import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  border: 1px solid #f5c6cb;
`;

function ErrorMessage({ message }) {
  return (
    <ErrorContainer>
      {message}
    </ErrorContainer>
  );
}

export default ErrorMessage; 