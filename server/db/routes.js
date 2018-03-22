const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'images/', limits: { fileSize: 10000000 } }); // 10 MB max
const router = express.Router();

const tripController = require('./controllers/trip.controller');
const expenseController = require('./controllers/expense.controller');

// upload image
router.post('/image/upload/:tripId/:expenseId', upload.any(), expenseController.uploadImages);

// trip
router.post('/trip/new', tripController.createTrip);
router.put('/trip/:tripId', tripController.updateTrip);
router.get('/trip/:tripId', tripController.getTripById);
router.get('/trips', tripController.getAllTrips);
router.delete('/trip/:tripId', tripController.deleteTripById); // should delete all expenses along with trip

// expense
router.post('/expense/new', expenseController.createExpense);
router.put('/trip/:tripId/expense/:expenseId', expenseController.updateExpenseByTripIdAndExpenseId);
router.get('/trip/:tripId/expense/:expenseId', expenseController.getExpenseByTripIdAndExpenseId);
router.get('/expenses/all', expenseController.getAllExpenses);
router.delete('/trip/:tripId/expense/:expenseId', expenseController.deleteExpenseByTripIdAndExpenseId);

router.get('/tripexpenses/:tripId', expenseController.getAllExpensesByTripId);
router.delete('/tripexpenses/:tripId', expenseController.deleteAllExpensesByTripId);

module.exports = router;
