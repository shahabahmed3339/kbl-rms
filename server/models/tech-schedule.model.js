const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TechScheduleSchema = new Schema({
  _id: { type: Number, required: true },
  CV: { type: String, required: true },
  Name: { type: String, required: true },
  EvalDate: { type: String, required: true },
  EvalTime: { type: String, required: true },
  Designation: { type: String, required: true },
  Status: { type: String, required: true },
  Evaluators: [{ type: String, required: true }],
});

const TechSchedule = mongoose.model('TechSchedule', TechScheduleSchema);

module.exports = TechSchedule;