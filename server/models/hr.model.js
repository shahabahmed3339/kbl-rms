const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// While adding new HR, set status to false by default...

const hrSchema = new Schema({
  _id: { type: Number, required: true },
  Requisition: { type: String, required: true },
  Name: { type: String, required: true },
  Designation: { type: String, required: true },
  Department: { type: String, required: true },
  Level: { type: Number, required: true },
  LineManager: { type: String, required: true },
  Image: { type: String },
  CNIC: { type: String },
  Salary: { type: Number, required: true },
  MedAllownce: { type: Number, required: true },
  RentAllownce: { type: Number, required: true },
  Miscellaneous: { type: Number, required: true },
  TotalSalary: { type: Number, required: true },
  Date: { type: String },
  STATUS: {type: Boolean}
});

const HR = mongoose.model('HR', hrSchema);

module.exports = HR;