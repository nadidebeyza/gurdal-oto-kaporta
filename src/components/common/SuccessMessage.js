import React from 'react';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  border: 1px solid #c3e6cb;
`;

function SuccessMessage({ message }) {
  return (
    <SuccessContainer>
      {message}
    </SuccessContainer>
  );
}

export default SuccessMessage; 