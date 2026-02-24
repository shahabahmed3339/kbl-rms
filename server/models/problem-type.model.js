const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProblemTypeSchema = new Schema({
  _id: { type: Number, required: true },
  ProbType: { type: String, required: true },
});

const ProblemType = mongoose.model('ProblemType', ProblemTypeSchema);

module.exports = ProblemType;