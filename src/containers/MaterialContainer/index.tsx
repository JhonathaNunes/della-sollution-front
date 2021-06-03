import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import Material from '../../contracts/models/Material';
import ContentTable, { ColumnsInterface } from '../../components/ContentTable';
import TableActions from '../../components/TableActions';
import currencyFormatter from '../../utils/NumberFormatter';

interface MaterialContainerProps {
  materials: Material[];
  viewClick: (service: Material) => void;
  deleteClick: (id: number) => void;
}

const MaterialContainer: React.FC<MaterialContainerProps> = ({
  materials,
  viewClick,
  deleteClick,
}) => {
  const columns: ColumnsInterface[] = [
    {
      id: 'name',
      label: 'Nome',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'storage',
      label: 'Estoque',
      minWidth: 30,
      align: 'left',
    },
    {
      id: 'value',
      label: 'Valor unitário',
      minWidth: 30,
      align: 'left',
    },
    {
      id: 'actions',
      label: '',
      minWidth: 30,
      align: 'left',
    },
  ];

  if (!(materials.length > 0)) {
    return (
      <div className="spinner-container" style={{ height: '100%' }}>
        Não foi possível recurperar os serviços
      </div>
    );
  }

  return (
    <ContentTable columns={columns}>
      {materials.map((material) => (
        <TableRow hover key={material.id}>
          <TableCell>{material.name}</TableCell>
          <TableCell>{material.storage}</TableCell>
          <TableCell>{currencyFormatter(material.uniqueValue)}</TableCell>
          <TableCell>
            <TableActions
              viewClick={() => viewClick(material)}
              deleteClick={() => deleteClick(material.id || -1)}
            />
          </TableCell>
        </TableRow>
      ))}
    </ContentTable>
  );
};

export default MaterialContainer;
