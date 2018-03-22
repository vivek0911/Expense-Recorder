import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import tripReducer from './trip.reducer';
import expenseReducer from './expense.reducer';

const rootReducer = combineReducers({
  routing,
  tripReducer,
  expenseReducer,
});

export default rootReducer;
