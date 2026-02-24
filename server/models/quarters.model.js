const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuarterSchema = new Schema({
  _id: { type: Number, required: true },
  Quarter: { type: String, required: true },
  Start: { type: String, required: true },
  End: { type: String, required: true },
});

const Quarter = mongoose.model('Quarter', QuarterSchema);

module.exports = Quarter;