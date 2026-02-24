const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CIAMarkSchema = new Schema({
  _id: { type: Number, required: true },
  APID: { type: Number, required: true },
  APType: { type: String, required: true },
  Confidentiality: { type: Number, required: true },
  Integrity: { type: Number, required: true },
  Availability: { type: Number, required: true },
  Mult: { type: Number, required: true },
  Class: { type: String, required: true },
  Date: { type: String, required: false },
});

const CIAMark = mongoose.model('CIAMark', CIAMarkSchema);

module.exports = CIAMark;