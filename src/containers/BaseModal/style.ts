import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    min-width: 350px;
    max-width: fit-content;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  padding: 15px;
  
  h2 {
    margin: 0;
    color: #1976d2;
  }
  
  .close-button {
    margin: 0 0 0 auto;
  }
`;

export const ModalBody = styled.div`
  height: 100%;
  padding: 15px;
`;
