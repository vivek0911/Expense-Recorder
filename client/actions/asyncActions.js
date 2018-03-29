import Request from 'axios';
import syncActions from './syncActions';

const ip = '/api';
function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => r);
}

// s3 upload
exports.uploadImage = (images, tripId, expenseId) => (dispatch) => {
  const data = new FormData();
  images.forEach(img => data.append('file', img));
  makeRequest('post', `/image/upload/${tripId}/${expenseId}`, data)
    .then(response => dispatch(syncActions.updatedExpense(response.data)));
};

// trips
exports.getAllTrips = () => dispatch => makeRequest('get', '/trips')
  .then(response => dispatch(syncActions.gotAllTrips(response.data)));

exports.addTrip = trip => dispatch => makeRequest('post', '/trip/new', trip)
  .then(response => dispatch(syncActions.addedTrip(response.data)));

exports.updateTrip = (trip, tripId) => dispatch => makeRequest('put', `/trip/${tripId}`, trip)
  .then(response => dispatch(syncActions.updatedTrip(response.data)));

exports.deleteTrip = tripId => dispatch => makeRequest('delete', `/trip/${tripId}`)
  .then(response => dispatch(syncActions.deletedTrip(response.data)));

// expenses
exports.getAllExpenses = () => dispatch => makeRequest('get', '/expenses/all')
  .then(response => dispatch(syncActions.gotAllExpenses(response.data)));

exports.addExpense = expense => dispatch => makeRequest('post', '/expense/new', expense)
  .then(response => dispatch(syncActions.addedExpense(response.data)));

exports.updateExpense = (expense, tripId, expenseId) => dispatch => makeRequest('put', `/trip/${tripId}/expense/${expenseId}`, expense)
  .then(response => dispatch(syncActions.updatedExpense(response.data)));

exports.deleteExpense = (tripId, expenseId) => dispatch => makeRequest('delete', `/trip/${tripId}/expense/${expenseId}`)
  .then(response => dispatch(syncActions.deletedExpense(response.data)));

// trip-expense
exports.getExpensesByTripId = tripId => dispatch => makeRequest('get', `/tripexpenses/${tripId}`)
  .then(response => dispatch(syncActions.gotExpensesByTripId(response.data)));
