import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';

export default () => (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
    <Redirect to="/dashboard" />
  </Switch>
);
