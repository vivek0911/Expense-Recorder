import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import tripReducer from './trip.reducer';
import expenseReducer from './expense.reducer';
import ratesReducer from './rates.reducer';

const rootReducer = combineReducers({
  routing,
  tripReducer,
  expenseReducer,
  ratesReducer,
});

export default rootReducer;
