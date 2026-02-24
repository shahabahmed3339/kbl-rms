const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TechEvaluationSchema = new Schema({
  _id: { type: Number, required: true },
  CV: { type: String, required: true },
  Name: { type: String, required: true },
  Designation: { type: String, required: true },
  Status: { type: String, required: true },
  Feedback: { type: String, required: true },
  Evaluator: { type: String, required: true },
});

const TechEvaluation = mongoose.model('TechEvaluation', TechEvaluationSchema);

module.exports = TechEvaluation;