const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Designation: { type: String, required: true },
  Email: { type: String, required: true },
  Contact: { type: String, required: true },
  CL: { type: String, required: true },
  CV: { type: String, required: true },
  ApplDate: { type: String, required: true },
  Status: { type: String, required: true },
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;