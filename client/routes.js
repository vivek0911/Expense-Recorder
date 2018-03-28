import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import TripExpense from './components/expenseComponent/TripExpense';

export default () => (
  <Switch>
    <Route path="/dashboard" render={props => <Dashboard {...props} />} />
    <Route
      path="/trip/:id" render={props => <TripExpense trip={props.location.state.trip} />}
    />
    <Redirect to="/dashboard" />
  </Switch>
);
