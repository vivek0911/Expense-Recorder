const Expense = require('../models/expense.model');
// const _ = require('lodash');

exports.createExpense = expense => new Promise((resolve, reject) => {
  Expense.create(expense, (error, createdExpense) => {
    if (error) {
      reject(error);
    }
    resolve(createdExpense && createdExpense.toObject());
  });
});

exports.updateExpenseByTripIdAndExpenseId = (tripId, expenseId, expense) => new Promise((resolve, reject) => {
  Expense.findOneAndUpdate({ $and: [{ _id: expenseId }, { tripId }] }, expense, { new: true })
    .then((updatedExpense) => {
      resolve(updatedExpense && updatedExpense.toObject());
    })
    .catch((error) => {
      reject(error);
    });
});

exports.getExpenseByTripIdAndExpenseId = (tripId, expenseId) => new Promise((resolve, reject) => {
  Expense.findOne({ _id: expenseId, tripId }, (error, expense) => {
    if (error) {
      reject(error);
    }
    resolve(expense && expense.toObject());
  });
});

exports.getAllExpenses = () => new Promise((resolve, reject) => {
  Expense.find({})
    .exec((error, allExpenses) => {
      if (error) {
        reject(error);
      }
      const expenses = (allExpenses || []).map(e => e && e.toObject());
      resolve(expenses);
    });
});

exports.deleteExpenseByTripIdAndExpenseId = (tripId, expenseId) => new Promise((resolve, reject) => {
  Expense.findOneAndRemove({ _id: expenseId, tripId }, (error, deletedExpense) => {
    if (error) {
      reject(error);
    }
    resolve(deletedExpense && deletedExpense.toObject());
  });
});


exports.getAllExpensesByTripId = tripId => new Promise((resolve, reject) => {
  Expense.find({ tripId }, (error, allExpenses) => {
    if (error) {
      reject(error);
    }
    const expenses = (allExpenses || []).map(e => e && e.toObject());
    resolve(expenses);
  });
});

exports.deleteAllExpensesByTripId = tripId => new Promise((resolve, reject) => {
  Expense.deleteMany({ tripId }, (error, deletedCount) => {
    if (error) {
      reject(error);
    }
    resolve(deletedCount);
  });
});
