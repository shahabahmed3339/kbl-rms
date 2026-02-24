const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequisitionSchema = new Schema({
  _id: { type: Number, required: true },
  RequestedBy: { type: String, required: true },
  Department: { type: String, required: true },
  Designation: { type: String, required: true },
  Level: { type: String, required: true },
  Title: { type: String, required: true },
  Purpose: { type: String, required: true },
  Type: { type: String, required: true },
  RequDate: { type: String, required: false },
  Facilities: [{ type: String, required: true }],
  Roles: [{ type: String, required: true }],
  AsgndPrcss: [{ type: String, required: true }],
  EduCri: [{ type: String, required: true }],
  Expr: [{ type: String, required: true }],
  ReqsDate: { type: String, required: false },
});

const Requisition = mongoose.model('Requisition', RequisitionSchema);

module.exports = Requisition;