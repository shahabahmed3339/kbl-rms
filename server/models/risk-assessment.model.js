const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RiskAssessmentSchema = new Schema({
  _id: { type: Number, required: true },
  APType: { type: String, required: true },
  APID: { type: Number, required: true },
  Risk_Name: { type: String, required: true },
  Risk_Details: { type: String, required: true },
  Vulnrblt: { type: String, required: true },
  Vulnrblt_Details: { type: String, required: true },
  Exposr: { type: Number, required: true },
  Impact: { type: Number, required: true },
  Probab: { type: Number, required: true },
  Summary: { type: Number, required: true },
  Year: { type: Number, required: true },
  Quarter: { type: String, required: true },
  Date: { type: String, required: false }
});

const RiskAssessment = mongoose.model('RiskAssessment', RiskAssessmentSchema);

module.exports = RiskAssessment;