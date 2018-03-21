const Trip = require('../models/trip.model');
// const _ = require('lodash');

exports.createTrip = trip => new Promise((resolve, reject) => {
  Trip.create(trip, (error, createdTrip) => {
    if (error) {
      reject(error);
    }
    resolve(createdTrip && createdTrip.toObject());
  });
});

exports.updateTrip = (tripId, trip) => new Promise((resolve, reject) => {
  Trip.findOneAndUpdate({ $and: [{ _id: tripId }] }, trip, { new: true })
    .then((updatedTrip) => {
      resolve(updatedTrip && updatedTrip.toObject());
    })
    .catch((error) => {
      reject(error);
    });
});

exports.getTripById = tripId => new Promise((resolve, reject) => {
  Trip.findById(tripId, (error, trip) => {
    if (error) {
      reject(error);
    }
    resolve(trip && trip.toObject());
  });
});

exports.getAllTrips = () => new Promise((resolve, reject) => {
  Trip.find({})
    .exec((error, allTrips) => {
      if (error) {
        reject(error);
      }
      const trips = (allTrips || []).map(t => t && t.toObject());
      resolve(trips);
    });
});

exports.deleteTripById = tripId => new Promise((resolve, reject) => {
  Trip.findOneAndRemove({ _id: tripId }, (error, deletedTrip) => {
    if (error) {
      reject(error);
    }
    resolve(deletedTrip && deletedTrip.toObject());
  });
});
