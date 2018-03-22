const ExpenseService = require('../services/expense.service');
const TripService = require('../services/trip.service');
const s3Service = require('../services/s3.service');
const _ = require('lodash');
const path = require('path');

exports.createExpense = (request, response) => {
  const expense = _.assign({}, request.body);
  TripService.getTripById(expense.tripId)
  .then((trip) => {
    if (trip) {
      ExpenseService.createExpense(expense)
        .then((createdExpense) => {
          response.status(200).send(createdExpense);
        })
        .catch((error) => {
          response.status(422).send(error);
        });
    }
  })
  .catch((error) => {
    response.status(422).send(`could not get trip by id : error=${error}`);
  });
};

exports.updateExpenseByTripIdAndExpenseId = (request, response) => {
  const { tripId, expenseId } = request.params;
  const expense = request.body;
  ExpenseService.updateExpenseByTripIdAndExpenseId(tripId, expenseId, expense)
      .then((updatedExpense) => {
        response.status(200).send(updatedExpense);
      })
      .catch((error) => {
        response.status(422).send(error);
      });
};

exports.getExpenseByTripIdAndExpenseId = (request, response) => {
  const { tripId, expenseId } = request.params;
  ExpenseService.getExpenseByTripIdAndExpenseId(tripId, expenseId)
    .then((expense) => {
      response.status(200).send(expense);
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.getAllExpenses = (request, response) => {
  ExpenseService.getAllExpenses()
    .then((expenses) => {
      response.status(200).send(expenses);
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.deleteExpenseByTripIdAndExpenseId = (request, response) => {
  const { tripId, expenseId } = request.params;
  ExpenseService.deleteExpenseByTripIdAndExpenseId(tripId, expenseId)
    .then((deletedExpense) => {
      if (deletedExpense) {
        response.status(200).send(deletedExpense);
      }
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.getAllExpensesByTripId = (request, response) => {
  ExpenseService.getAllExpensesByTripId(request.params.tripId)
    .then((expenses) => {
      response.status(200).send(expenses);
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.deleteAllExpensesByTripId = (request, response) => {
  ExpenseService.deleteAllExpensesByTripId(request.params.tripId)
    .then((deletedExpenses) => {
      if (deletedExpenses) {
        response.status(200).send({ deletedExpenses, deletedCount: deletedExpenses.result.n });
      }
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.uploadImages = (request, response) => {
  const files = request.files;
  const promiseArr = files.map((file) => {
    const absPath = path.resolve(process.cwd(), file.path);
    const fileName = file.originalname;
    return s3Service.uploadFile(process.env.S3_BUCKET_NAME, fileName, absPath);
  });
  Promise.all(promiseArr)
    .then((results) => {
      const urlArr = results.map(result => result.Location);
      const { tripId, expenseId } = request.params;
      ExpenseService.updateExpenseByTripIdAndExpenseId(tripId, expenseId, { images: urlArr })
      .then((updatedExpense) => {
        response.status(200).send(updatedExpense);
      })
      .catch((error) => {
        response.status(422).send(error);
      });
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};
