import _ from 'lodash';
import Immutable, { List } from 'immutable';
import initialState from './initialState';

export default (state = initialState.get('trip'), action) => {
  switch (action.type) {
    case 'GOT_ALL_TRIPS':
      return state.set('allTrips', action.payload);
      // return _.assign({}, state, { allTrips: action.payload });
    case 'NEW_TRIP_ADDED':
      const list1 = List(state.get('allTrips'));
      return state.set('allTrips', list1.push(action.payload));
      // return _.assign({}, state, { allTrips: [action.payload, ...state.allTrips] });
    case 'UPDATED_TRIP':
      // const newTrip = action.payload;
      // const updatedTrips = (state.allTrips || []).map(t => t._id === newTrip._id ? newTrip : t);
      // return _.assign({}, state, { allTrips: updatedTrips });
      const newTrip = Immutable.fromJS(action.payload);
      const updatedTrips = List(state.get('allTrips')).map(t => t._id === newTrip.get('_id') ? newTrip : t);
      return state.set('allTrips', updatedTrips);
    case 'DELETED_TRIP':
      // const dTrip = action.payload.deletedTrip;
      // const newTripArr = (state.allTrips || []).filter(t => t._id !== dTrip._id);
      // return _.assign({}, state, { allTrips: newTripArr, selectedTrip: state.selectedTrip._id === dTrip._id ? {} : state.selectedTrip });
      const dTrip = Immutable.fromJS(action.payload.deletedTrip);
      const newTripArr = List(state.get('allTrips')).filter(t => t._id !== dTrip.get('_id'));
      return state.set('allTrips', newTripArr).set('selectedTrip', state.get('selectedTrip')._id === dTrip.get('_id') ? {} : state.get('selectedTrip'));
    case 'TRIP_SELECTED':
      // return _.assign({}, state, { selectedTrip: action.trip });
      return state.set('selectedTrip', action.trip);
    default:
      return state;
  }
};
