import _ from 'lodash';
import { List } from 'immutable';
import initialState from './initialState';

export default (state = initialState.get('expense'), action) => {
  switch (action.type) {
    case 'GOT_ALL_EXPENSES':
      // return _.assign({}, state, { allExpenses: action.payload });
      return state.set('allExpenses', action.payload);

    case 'NEW_EXPENSE_ADDED':
      // return _.assign({}, state, { allExpenses: [action.payload, ...state.allExpenses] });
      const list1 = List(state.get('allExpenses'));
      return state.set('allExpenses', list1.push(action.payload));
    case 'UPDATED_EXPENSE':
      // const newExpe = action.payload;
      // const updatedExpes = (state.allExpenses || []).map(e => e._id === newExpe._id ? newExpe : e);
      // return _.assign({}, state, { allExpenses: updatedExpes });
      const newExpe = action.payload;
      const updatedExpes = List(state.get('allExpenses')).map(e => e._id === newExpe._id ? newExpe : e);
      return state.set('allExpenses', updatedExpes);
    case 'DELETED_EXPENSE':
      // const dExpe = action.payload;
      // const newExpeArr = (state.allExpenses || []).filter(e => e._id !== dExpe._id);
      // return _.assign({}, state, { allExpenses: newExpeArr });
      const dExpe = action.payload;
      const newExpeArr = List(state.get('allExpenses')).filter(e => e._id !== dExpe._id);
      return state.set('allExpenses', newExpeArr);
    case 'DELETED_TRIP':
      const dTrip = action.payload.deletedTrip;
      const temp = List(state.get('allExpenses')).filter(e => e.tripId !== dTrip._id);
      return state.set('allExpenses', temp);
    case 'CONVERT_CUREENCY_EXPENSE':
      const obj = action.payload;
      const newArr = List(state.get('allExpenses')).map(e => e._id === obj._id ? obj : e);
      return state.set('allExpenses', newArr);
    default:
      return state;
  }
};
