import styled from 'styled-components';

export const EditService = styled.div`
  width: 100%;
`;

export const ServiceRow = styled.div`
  width: 100%;
  border-bottom: 1px solid #4a40bf;
  display: flex;
  justify-content: space-between;
  
  h3 {
    width: 75%;
    color: #4a40bf;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
  }
`;
