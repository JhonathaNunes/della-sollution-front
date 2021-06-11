import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import Order from '../../contracts/models/Order';
import ContentTable, { ColumnsInterface } from '../../components/ContentTable';
import TableActions from '../../components/TableActions';

interface OrderContainerProps {
  orders: Order[];
  viewClick: (order: Order) => void;
  deleteClick: (id: number) => void;
}

const OrdersContainer: React.FC<OrderContainerProps> = ({
  orders,
  viewClick,
  deleteClick,
}) => {
  const columns: ColumnsInterface[] = [
    {
      id: 'orderId',
      label: '#',
      minWidth: 10,
      align: 'left',
    },
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
      id: 'actions',
      label: '',
      minWidth: 30,
      align: 'left',
    },
  ];

  if (orders.length > 0) {
    return (
      <ContentTable columns={columns}>
        {orders.map((order) => (
          <TableRow hover key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.client.fullName}</TableCell>
            <TableCell>{order.client.email}</TableCell>
            <TableCell>
              <TableActions
                viewClick={() => viewClick(order)}
                deleteClick={() => deleteClick(order.id || -1)}
              />
            </TableCell>
          </TableRow>
        ))}
      </ContentTable>
    );
  }

  return (
    <div className="spinner-container" style={{ height: '100%' }}>
      Não foi possível recurperar os pedidos
    </div>
  );
};

export default OrdersContainer;
