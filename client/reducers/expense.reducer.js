import _ from 'lodash';
import initialState from './initialState';

export default (state = initialState.expense, action) => {
  switch (action.type) {
    case 'GOT_ALL_EXPENSES':
      return _.assign({}, state, { allExpenses: action.payload });
    case 'NEW_EXPENSE_ADDED':
      return _.assign({}, state, { allExpenses: [action.payload, ...state.allExpenses] });
    case 'UPDATED_EXPENSE':
      const newExpe = action.payload;
      const updatedExpes = (state.allExpenses || []).map(e => e._id === newExpe._id ? newExpe : e);
      return _.assign({}, state, { allExpenses: updatedExpes });
    case 'DELETED_EXPENSE':
      const dExpe = action.payload;
      const newExpeArr = (state.allExpenses || []).filter(e => e._id !== dExpe._id);
      return _.assign({}, state, { allExpenses: newExpeArr });
    case 'DELETED_TRIP':
      const dTrip = action.payload.deletedTrip; // check payload
      const temp = (state.allExpenses || []).filter(e => e.tripId !== dTrip._id);
      return _.assign({}, state, { allExpenses: temp });
    case 'CONVERT_CUREENCY_EXPENSE':
      const obj = action.payload;
      const newArr = (state.allExpenses || []).map(e => e._id === obj.id ? _.assign({}, e, { amount: obj.amt, baseCurrency: obj.curr }) : e);
      return _.assign({}, state, { allExpenses: newArr });
    default:
      return state;
  }
};
