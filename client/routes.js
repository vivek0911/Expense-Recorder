import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import TripExpensePage from './components/expenseComponent/TripExpensePage';

export default () => (
  <Switch>
    <Route path="/dashboard" render={props => <Dashboard {...props} />} />
    <Route
      path="/trip/:id" render={(props) => {
        const { trip, totalExp, expense } = props.location.state;
        return <TripExpensePage {...{ trip, expense, totalExp, match: props.match }} />;
      }}
    />
    <Redirect to="/dashboard" />
  </Switch>
);

// fix api call from dashboard
// fix currency conversion and total expense of trip

// delete ShowTrip from tripComponent
