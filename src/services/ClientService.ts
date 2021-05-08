import api from './Api';
import Client from '../contracts/models/Client';

export const get = () => api.get('client');

export const create = (client: Client) => {
  const params = {
    id: client.id,
    full_name: client.fullName,
    email: client.email,
    phone: client.phone,
    cpf: client.cpf,
    cnpj: client.cnpj,
  };

  return api.post('client', params);
};

export const deleteModel = () => api.delete('client');

export const update = (client: Client) => {
  const params = {
    full_name: client.fullName,
    email: client.email,
    phone: client.phone,
    cpf: client.cpf,
    cnpj: client.cnpj,
  };

  return api.put(`client/${client.id}`, params);
};
