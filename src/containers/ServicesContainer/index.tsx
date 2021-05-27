import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import Service from '../../contracts/models/Service';
import ContentTable, { ColumnsInterface } from '../../components/ContentTable';
import TableActions from '../../components/TableActions';
import currencyFormatter from '../../Utils/NumberFormatter';

interface ServiceContainerProps {
  services: Service[];
  viewClick: (service: Service) => void;
  deleteClick: (id: number) => void;
}

const ServicesContainer: React.FC<ServiceContainerProps> = ({
  services,
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
      id: 'valueHour',
      label: 'Valor hora',
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

  if (services.length > 0) {
    return (
      <ContentTable columns={columns}>
        {services.map((service) => (
          <TableRow hover key={service.id}>
            <TableCell>{service.name}</TableCell>
            <TableCell>{currencyFormatter(service.valueHour)}</TableCell>
            <TableCell>
              <TableActions
                viewClick={() => viewClick(service)}
                deleteClick={() => deleteClick(service.id || -1)}
              />
            </TableCell>
          </TableRow>
        ))}
      </ContentTable>
    );
  }

  return (
    <div className="spinner-container" style={{ height: '100%' }}>
      Não foi possível recurperar os serviços
    </div>
  );
};

export default ServicesContainer;
