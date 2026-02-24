const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProbabilitySchema = new Schema({
  _id: { type: Number, required: true },
  Probab: { type: String, required: true }
});

const Probability = mongoose.model('Probability', ProbabilitySchema);

module.exports = Probability;