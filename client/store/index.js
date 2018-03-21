import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middleware = [thunk];
  middleware.push(createLogger({ collapsed: true }));
  return createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f));
}
