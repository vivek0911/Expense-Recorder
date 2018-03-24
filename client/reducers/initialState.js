import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  trip: {
    allTrips: [],
    selectedTrip: {},
  },
  expense: {
    allExpenses: [],
  },
});

export default initialState;
