const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeductionSchema = new Schema({
  HRID: { type: Number, required: true },
  Mobile: { type: Number, required: true },
  Damage: { type: Number, required: true },
  Other: { type: Number, required: true },
  Miscellaneous: { type: Number, required: true },
  Ariel: { type: Number, required: true },
  Deducted: { type: Number, required: true },
  Month: { type: String, required: true },
});

const Deduction = mongoose.model('Deduction', DeductionSchema);

module.exports = Deduction;