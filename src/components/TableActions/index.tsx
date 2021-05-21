import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';

interface TableActionsProps {
  viewClick: () => void;
  deleteClick: () => void;
}

const TableActions: React.FC<TableActionsProps> = (
  { viewClick, deleteClick },
) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <IconButton
      onClick={viewClick}
    >
      <AiOutlineEye />
    </IconButton>
    <IconButton
      onClick={deleteClick}
    >
      <AiOutlineDelete />
    </IconButton>
  </div>
);

export default TableActions;
