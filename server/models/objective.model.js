const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectiveSchema = new Schema({
  _id: { type: Number, required: true },
  Objective: { type: String, required: true },
  Description: { type: String, required: true },
  Goal: { type: String, required: true },
  AssignedTo: { type: String, required: true },
  Resource: { type: String, required: true },
  Action: { type: String, required: true },
  Deadline: { type: String, required: true },
  ResultInEvidence: { type: String, required: true },
  EvalFreq: { type: String, required: true },
  TotalScore: { type: Number, required: true },
  Priority: { type: String, required: true },
  Outcome: { type: String, required: true }
});

const Objective = mongoose.model('Objective', ObjectiveSchema);

module.exports = Objective;