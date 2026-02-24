const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProcessSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Departments: [{ type: String, required: true }],
  Designations: { type: String, required: true },
  ProcessOwner: { type: String, required: true },
  Activities: [{ type: String, required: true }],
  Asset: { type: String, required: true },
});

const Process = mongoose.model('Process', ProcessSchema);

module.exports = Process;