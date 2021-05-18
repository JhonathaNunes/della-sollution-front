import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import Client from '../../contracts/models/Client';
import ContentTable, { ColumnsInterface } from '../../components/ContentTable';
import TableActions from '../../components/TableActions';

interface ClientContainerProps {
  clients: Client[];
  viewClick: () => void;
  deleteClick: (id: number) => void;
}

const ClientsContainer: React.FC<ClientContainerProps> = ({
  clients, viewClick, deleteClick,
}) => {
  const columns: ColumnsInterface[] = [
    {
      id: 'fullname',
      label: 'Nome',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'email',
      label: 'E-mail',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'phone',
      label: 'Telefone',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'actions',
      label: '',
      minWidth: 30,
      align: 'left',
    },
  ];

  if (clients.length > 0) {
    return (
      <ContentTable columns={columns}>
        {clients.map((client) => (
          <TableRow hover key={client.id}>
            <TableCell>{client.fullName}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>
              <TableActions
                viewClick={viewClick}
                deleteClick={() => deleteClick(client.id || -1)}
              />
            </TableCell>
          </TableRow>
        ))}
      </ContentTable>
    );
  }

  return (
    <div className="spinner-container" style={{ height: '100%' }}>
      Não foi possível recurperar os clientes
    </div>
  );
};

export default ClientsContainer;
