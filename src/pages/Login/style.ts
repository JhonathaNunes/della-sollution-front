import styled from 'styled-components';
import { TextField } from '@material-ui/core';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  
  img {
    width: 150px;
    height: 150px;
    margin-bottom: 30px;
  }
`;

export const FormContainer = styled.form`
  width: 350px;
  justify-content: space-between;
`;

export const StyledInput = styled(TextField)`
  margin-bottom: 30px !important;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;
