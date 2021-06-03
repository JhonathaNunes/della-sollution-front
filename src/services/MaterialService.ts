import api from './Api';
import Material from '../contracts/models/Material';

export const getMaterial = () => api.get('material');

export const createMaterial = (material: Material) => {
  const params = {
    name: material.name,
    description: material.description,
    storage: material.storage,
    unique_value: material.uniqueValue,
  };

  return api.post('material', params);
};

export const deleteMaterial = (id: number) => api.delete(`material/${id}`);

export const updateMaterial = (material: Material) => {
  const params = {
    name: material.name,
    description: material.description,
    new_items: material.newItems,
    unique_value: material.uniqueValue,
  };

  return api.put(`material/${material.id}`, params);
};
