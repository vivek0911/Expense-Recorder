import _ from 'lodash';
import initialState from './initialState';

export default (state = initialState.trip, action) => {
  switch (action.type) {
    case 'GOT_ALL_TRIPS':
      return _.assign({}, state, { allTrips: action.payload, tripsData: action.payload });
    case 'NEW_TRIP_ADDED':
      return _.assign({}, state, { allTrips: [action.payload, ...state.allTrips] });
    case 'UPDATED_TRIP':
      const newTrip = action.payload;
      const updatedTrips = (state.allTrips || []).map(t => t._id === newTrip._id ? newTrip : t);
      return _.assign({}, state, { allTrips: updatedTrips });
    case 'DELETED_TRIP':
      const dTrip = action.payload.deletedTrip;
      const newTripArr = (state.allTrips || []).filter(t => t._id !== dTrip._id);
      return _.assign({}, state, { allTrips: newTripArr, selectedTrip: state.selectedTrip._id === dTrip._id ? {} : state.selectedTrip });
    case 'TRIP_SELECTED':
      return _.assign({}, state, { selectedTrip: action.trip });
    case 'FILTER_TRIP':
      const filteredData = _.isEmpty(action.payload.text) ? state.tripsData : state.tripsData.filter(x => _.includes(_.toLower(x.title), _.toLower(action.payload.text)));
      return _.assign({}, state, { allTrips: filteredData });
    case 'GOT_ALL_EXPENSES_OF_TRIP':
      return _.assign({}, state, { tripExpenses: action.payload });

    case 'CONVERT_CUREENCY_EXPENSE':
      const obj = action.payload;
      const newArr = (state.tripExpenses || []).map(e => e._id === obj.id ? _.assign({}, e, { amount: obj.amt, baseCurrency: obj.curr }) : e);
      return _.assign({}, state, { tripExpenses: newArr });
    case 'UPDATED_EXPENSE':
      const newExpe = action.payload;
      const updatedExpes = (state.tripExpenses || []).map(e => e._id === newExpe._id ? newExpe : e);
      return _.assign({}, state, { tripExpenses: updatedExpes });
    case 'DELETED_EXPENSE':
      const dExpe = action.payload;
      const newExpeArr = (state.tripExpenses || []).filter(e => e._id !== dExpe._id);
      return _.assign({}, state, { tripExpenses: newExpeArr });
    default:
      return state;
  }
};
