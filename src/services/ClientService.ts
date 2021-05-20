import api from './Api';
import Client from '../contracts/models/Client';

export const getClient = () => api.get('client');

export const createClient = (client: Client) => {
  const params = {
    full_name: client.fullName,
    email: client.email,
    phone: client.phone?.replace(/[^\w\s]/gi, '').replace(' ', '') || undefined,
    cpf: client.cpf?.replace(/[^\w\s]/gi, '') || undefined,
    cnpj: client.cnpj?.replace(/[^\w\s]/gi, '') || undefined,
  };

  return api.post('client', params);
};

export const deleteClient = (id: number) => api.delete(`client/${id}`);

export const updateClient = (client: Client) => {
  const params = {
    full_name: client.fullName,
    email: client.email,
    phone: client.phone?.replace(/[^\w\s]/gi, '').replace(' ', '') || undefined,
    cpf: client.cpf?.replace(/[^\w\s]/gi, '') || undefined,
    cnpj: client.cnpj?.replace(/[^\w\s]/gi, '') || undefined,
  };

  return api.put(`client/${client.id}`, params);
};
