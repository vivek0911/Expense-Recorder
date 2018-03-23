import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import ImageUpload from './components/ImageUpload';
import TripComponent from './components/tripComlonent/TripComponent';
import Dashboard from './components/dashboard/Dashboard';

export default () => (
  <Switch>
    <Route path="/image" component={ImageUpload} />
    <Route path="/trip" component={TripComponent} />
    <Route path="/dashboard" component={Dashboard} />
    <Redirect to="/dashboard" />
  </Switch>
);
