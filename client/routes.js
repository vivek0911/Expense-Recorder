import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import HomePage from './components/homepage/HomePage';
import ImageUpload from './components/ImageUpload';

export default () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/image" component={ImageUpload} />
  </Switch>
);
