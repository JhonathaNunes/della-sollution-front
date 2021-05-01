import React, { useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useGlobal } from './hooks/useGlobal';
import { isLogged } from './services/Auth';
import { getData } from './services/LocalStorageService';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { user, setUser } = useGlobal();

  useEffect(() => {
    if (!user) {
      setUser(getData('user'));
    }
  });

  if (!isLogged()) {
    return <Redirect to="/login" />;
  }

  return (isLogged() ? <Route {...props} /> : <Redirect to="/login" />);
};

export default PrivateRoute;
