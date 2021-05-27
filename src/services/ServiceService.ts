import api from './Api';
import Service from '../contracts/models/Service';

export const getService = () => api.get('service');

export const createService = (service: Service) => {
  const params = {
    name: service.name,
    description: service.description,
    value_hour: service.valueHour,
  };

  return api.post('service', params);
};

export const deleteService = (id: number) => api.delete(`service/${id}`);

export const updateService = (service: Service) => {
  const params = {
    name: service.name,
    description: service.description,
    value_hour: service.valueHour,
  };

  return api.put(`service/${service.id}`, params);
};
