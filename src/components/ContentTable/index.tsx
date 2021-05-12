import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import StyledHeader from './style';

export interface ColumnsInterface {
  id: string;
  label: string;
  minWidth: number;
  align: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
}

interface TableProps {
  columns: ColumnsInterface[];
}

const ContentTable: React.FC<TableProps> = ({ columns, children }) => (
  <TableContainer style={{ height: '100%' }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <StyledHeader
              key={col.id}
              align={col.align}
              style={{ minWidth: col.minWidth }}
            >
              {col.label}
            </StyledHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  </TableContainer>
);

export default ContentTable;
