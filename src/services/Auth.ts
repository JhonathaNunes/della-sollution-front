import { getData, clearStorage } from './LocalStorageService';

export const getToken = () => {
  const token = getData('accessToken');

  if (token !== null) {
    return token;
  }

  return null;
};

export const removeTokens = () => {
  clearStorage();
};

export const logout = () => {
  removeTokens();
  window.location.href = '/login';
};

export const isLogged = () => getData('accessToken') !== null;
