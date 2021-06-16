import api from './Api';
import Order from '../contracts/models/Order';

export const getOrder = () => api.get('orders');

export const createOrder = (order: Object) => api.post('orders', order);

export const deleteOrder = (id: number) => api.delete(`orders/${id}`);

export const updateOrder = (order: Order) => {
  const params = {
    description: order.description,
    client_id: order.client.id,
    services: order.services,
    address: order.address,
  };

  return api.put(`orders/${order.id}`, params);
};
