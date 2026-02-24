const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const YearSchema = new Schema({
  _id: { type: Number, required: true },
  Year: { type: Number, required: true },
  Description: { type: String, required: true }
});

const Year = mongoose.model('Year', YearSchema);

module.exports = Year;