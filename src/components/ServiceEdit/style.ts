import styled from 'styled-components';
import { FormControl } from '@material-ui/core';

export const EditService = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

export const ServiceRow = styled.div`
  width: 100%;
  border-bottom: 1px solid #4a40bf;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 20px;
  
  h3 {
    width: 75%;
    color: #4a40bf;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
    line-height: 50px;
  }
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const MaterialRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
