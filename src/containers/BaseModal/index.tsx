import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import { ModalHeader, StyledDialog, ModalBody } from './style';

interface BaseModalProps {
  title: string;
  handleClose: () => void;
  isOpen: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  title,
  isOpen,
  handleClose,
  children,
}) => (
  <StyledDialog
    open={isOpen}
    onClose={handleClose}
  >
    <ModalHeader>
      <h2>{ title }</h2>
      <IconButton className="close-button" onClick={handleClose}>
        <AiOutlineClose size={15} />
      </IconButton>
    </ModalHeader>
    <ModalBody>
      { children }
    </ModalBody>
  </StyledDialog>
);

export default BaseModal;
