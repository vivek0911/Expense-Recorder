const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  tripId: { type: Schema.ObjectId, ref: 'Trip', required: true },
  title: String,
  category: { type: String, required: true },
  mot: String, // mode of transportation
  date: Date,
  place: String,
  amount: { type: Number, required: true },
  baseCurrency: String,
  discription: String,
  images: [String],
},
  {
    timestamps: true,
    toObject: { virtuals: true },
  });

module.exports = mongoose.model('Expense', expenseSchema);

