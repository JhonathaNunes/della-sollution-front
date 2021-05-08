import styled from 'styled-components';

export const ClientHolder = styled.div`
  height: calc(100vh - 75px);
  display: flex;
  flex-direction: row;
`;

export const ClientHeader = styled.div`
  padding: 50px;

  h2 {
    color: #1976d2;
    font-size: 50px;
    font-weight: bold;
  }
`;

export const ClientBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
