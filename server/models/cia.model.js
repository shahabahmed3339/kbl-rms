const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CIASchema = new Schema({
  _id: { type: Number, required: true },
  Confidentiality: { type: String, required: true },
  Integrity: { type: String, required: true },
  Availability: { type: String, required: true }
});

const CIA = mongoose.model('CIA', CIASchema);

module.exports = CIA;