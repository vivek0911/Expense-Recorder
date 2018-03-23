import _ from 'lodash';
import initialState from './initialState';

export default (state = initialState.trip, action) => {
  switch (action.type) {
    case 'GOT_ALL_TRIPS':
      return _.assign({}, state, { allTrips: action.payload });
    case 'NEW_TRIP_ADDED':
      return _.assign({}, state, { allTrips: [action.payload, ...state.allTrips] });
    case 'UPDATED_TRIP':
      const newTrip = action.payload;
      const updatedTrips = (state.allTrips || []).map(t => t._id === newTrip._id ? newTrip : t);
      return _.assign({}, state, { allTrips: updatedTrips });
    case 'DELETED_TRIP':
      const dTrip = action.payload.deletedTrip; // check payload
      const newTripArr = (state.allTrips || []).filter(t => t._id !== dTrip._id);
      return _.assign({}, state, { allTrips: newTripArr, selectedTrip: state.selectedTrip._id === dTrip._id ? {} : state.selectedTrip });
    case 'TRIP_SELECTED':
      return _.assign({}, state, { selectedTrip: action.trip });
    default:
      return state;
  }
};
