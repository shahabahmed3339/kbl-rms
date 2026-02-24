const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HRScheduleSchema = new Schema({
  _id: { type: Number, required: true },
  CV: { type: String, required: true },
  Name: { type: String, required: true },
  EvalDate: { type: String, required: true },
  EvalTime: { type: String, required: true },
  Designation: { type: String, required: true },
  Status: { type: String, required: true },
});

const HRSchedule = mongoose.model('HRSchedule', HRScheduleSchema);

module.exports = HRSchedule;