const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RiskMitigationSchema = new Schema({
  _id: { type: Number, required: true },
  APType: { type: String, required: true },
  APID: { type: Number, required: true },
  Risk_ID: { type: Number, required: true },
  Action: { type: String, required: true },
  Mngmnt_System: { type: String, required: true },
  Controls: { type: String, required: true },
  Description: { type: String, required: true },
  Exposr: { type: Number, required: true },
  Impact: { type: Number, required: true },
  Probab: { type: Number, required: true },
  Summary: { type: Number, required: true },
  Date: { type: String, required: false },
});

const RiskMitigation = mongoose.model('RiskMitigation', RiskMitigationSchema);

module.exports = RiskMitigation;