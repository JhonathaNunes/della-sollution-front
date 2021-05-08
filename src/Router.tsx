import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import { isLogged } from './services/Auth';
import Home from './pages/Home';
import Clients from './pages/Clients';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/login"
        render={() => (isLogged() ? <Redirect to="/" /> : <Login />)}
      />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/clientes" component={Clients} />
      <Route render={() => <div>Not found</div>} />
    </Switch>
  </BrowserRouter>
);

export default Router;
