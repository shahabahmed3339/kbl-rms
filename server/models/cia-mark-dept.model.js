const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CIAMarkDeptSchema = new Schema({
  _id: { type: Number, required: true },
  Assets: [{ type: Number, required: true }],
  Confidentiality: { type: Number, required: true },
  Integrity: { type: Number, required: true },
  Availability: { type: Number, required: true },
  Mult: { type: Number, required: true },
  Class: { type: String, required: true },
});

const CIAMarkDept = mongoose.model('CIAMarkDept', CIAMarkDeptSchema);

module.exports = CIAMarkDept;