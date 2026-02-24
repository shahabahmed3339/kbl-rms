const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CaseReportSchema = new Schema({
  _id: { type: Number, required: true },
  Risk_ID: { type: Number, required: true },
  ProbType: { type: String, required: true },
  Problem: { type: String, required: true },
  ProbDetail: { type: String, required: true },
  Severity: { type: Number, required: true },
  Importance: { type: Number, required: true },
  ReportedBy: { type: String, required: true },
  AssignedTo: { type: String, required: true },
  Date: { type: String, required: false },
  Status: { type: String, required: true },
  Remarks: { type: String, required: false },
  Feedback: { type: String, required: false },
});

const CaseReport = mongoose.model('CaseReport', CaseReportSchema);

module.exports = CaseReport;