const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  tripId: { type: Schema.ObjectId, ref: 'Trip', required: true },
  category: { type: String, required: true }, // can be defined as enum
  date: Date,
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

