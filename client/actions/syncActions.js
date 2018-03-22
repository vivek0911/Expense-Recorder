// trips
exports.gotAllTrips = payload => ({ type: 'GOT_ALL_TRIPS', payload });
exports.addedTrip = payload => ({ type: 'NEW_TRIP_ADDED', payload });
exports.updatedTrip = payload => ({ type: 'UPDATED_TRIP', payload });
exports.deletedTrip = payload => ({ type: 'DELETED_TRIP', payload });

// expenses
exports.gotAllExpenses = payload => ({ type: 'GOT_ALL_EXPENSES', payload });
exports.addedExpense = payload => ({ type: 'NEW_EXPENSE_ADDED', payload });
exports.updatedExpense = payload => ({ type: 'UPDATED_EXPENSE', payload });
exports.deletedExpense = payload => ({ type: 'DELETED_EXPENSE', payload });
