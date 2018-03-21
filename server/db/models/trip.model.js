const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  title: String,
  startDate: Date,
  endDate: Date,
},
  {
    timestamps: true,
    toObject: { virtuals: true },
  });

module.exports = mongoose.model('Trip', tripSchema);

