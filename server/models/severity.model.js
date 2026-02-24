const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SeveritySchema = new Schema({
  _id: { type: Number, required: true },
  Severt: { type: String, required: true }
});

const Severity = mongoose.model('Severity', SeveritySchema);

module.exports = Severity;