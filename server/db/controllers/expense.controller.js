const ExpenseService = require('../services/expense.service');
const _ = require('lodash');

exports.createExpense = (request, response) => {
  const expense = _.assign({}, request.body);
  ExpenseService.createExpense(expense)
    .then((createdExpense) => {
      response.status(200).send(createdExpense);
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};

exports.updateExpenseByTripIdAndExpenseId = (request, response) => {
  const e = { ...{ tripId: request.params.tripId, expenseId: request.params.expenseId, expense: request.body } };
  ExpenseService.updateExpenseByTripIdAndExpenseId(e.tripId, e.expenseId, e.expense)
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
        response.status(200).send(deletedExpenses);
      }
    })
    .catch((error) => {
      response.status(422).send(error);
    });
};
