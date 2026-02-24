const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RiskManagementProgramSchema = new Schema({
  _id: { type: Number, required: true },
  StartYear: { type: Number, required: true },
  EndYear: { type: Number, required: true },
  Date: { type: String, required: false },
});

const RiskManagementProgram = mongoose.model('RiskManagementProgram', RiskManagementProgramSchema);

module.exports = RiskManagementProgram;