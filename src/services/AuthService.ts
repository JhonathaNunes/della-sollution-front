import api from './Api';

const authenticate = (username: string, password: string) => api.post(
  'login', null, {
    auth: {
      username,
      password,
    },
  },
);

export default authenticate;
