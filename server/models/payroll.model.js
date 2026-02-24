const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PayrollSchema = new Schema({
  HRID: [{ type: Number, required: true }],
  Salary: [{ type: Number, required: true }],
  Tax: [{ type: Number, required: true }],
  prvFund: [{ type: Number, required: true }],
  Month: { type: String, required: true },
});

const Payroll = mongoose.model('Payroll', PayrollSchema);

module.exports = Payroll;