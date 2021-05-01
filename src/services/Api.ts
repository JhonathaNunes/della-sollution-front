/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken, logout } from './Auth';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.auth = {
      username: token,
      password: '',
    };
  }

  return config;
});

const unauthenticatedUrls = [
  'login',
];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401
      && !unauthenticatedUrls.includes(error?.response?.config.url)) {
      logout();
    }

    return Promise.reject(error);
  },
);

export default api;
