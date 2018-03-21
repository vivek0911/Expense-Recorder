import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.scss';

import createRoutes from './routes';
import configureStore from './store';

const initialState = {};
const store = configureStore(initialState);
const routes = createRoutes(store);

render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
