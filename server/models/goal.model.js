const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  _id: { type: Number, required: true },
  Goal: { type: String, required: true },
  Description: { type: String, required: true },
  Vision: { type: String, required: true },
  Department: { type: String, required: true },
  Designation: { type: String, required: true },
  StrgcCont: { type: Number, required: true },
  Deadline: { type: String, required: true },
  Outcome: { type: String, required: true },
});

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;