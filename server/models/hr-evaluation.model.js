const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HREvaluationSchema = new Schema({
  _id: { type: Number, required: true },
  CV: { type: String, required: true },
  Name: { type: String, required: true },
  Designation: { type: String, required: true },
  Status: { type: String, required: true },
  Feedback: { type: String, required: true },
});

const HREvaluation = mongoose.model('HREvaluation', HREvaluationSchema);

module.exports = HREvaluation;