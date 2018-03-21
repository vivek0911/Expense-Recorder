import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import HomePage from './components/homepage/HomePage';

export default () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
  </Switch>
);
