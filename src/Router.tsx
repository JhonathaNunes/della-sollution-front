import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import { isLogged } from './services/Auth';
import Home from './pages/HomeOrders';
import Clients from './pages/Clients';
import Services from './pages/Services';
import Materials from './pages/Materials';

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
      <PrivateRoute exact path="/servicos" component={Services} />
      <PrivateRoute exact path="/materiais" component={Materials} />
      <Route render={() => <div>Not found</div>} />
    </Switch>
  </BrowserRouter>
);

export default Router;
