const TripService = require('../services/trip.service');
const ExpenseService = require('../services/expense.service');
const _ = require('lodash');

exports.createTrip = (request, response) => {
  const trip = _.assign({}, request.body);
  TripService.createTrip(trip)
    .then((createdTrip) => {
      response.status(200).send(createdTrip);
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.updateTrip = (request, response) => {
  TripService.updateTrip(request.params.tripId, request.body)
    .then((updatedTrip) => {
      response.status(200).send(updatedTrip);
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.getTripById = (request, response) => {
  TripService.getTripById(request.params.tripId)
    .then((trip) => {
      response.status(200).send(trip);
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.getAllTrips = (request, response) => {
  TripService.getAllTrips()
    .then((trips) => {
      response.status(200).send(trips);
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.deleteTripById = (request, response) => {
  // first delete all expenses for given trip id then delete trip
  ExpenseService.deleteAllExpensesByTripId(request.params.tripId)
    .then((deletedCount) => {
      TripService.deleteTripById(request.params.tripId)
       .then((deletedTrip) => {
         if (deletedTrip) {
           response.status(200).send({ deletedTrip, deletedCount });
         }
       })
      .catch((error) => {
        response.status(404).send(error);
      });
    })
    .catch((error) => {
      response.status(404).send(error);
    });
};
