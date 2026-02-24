const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RiskSchema = new Schema({
  _id: { type: Number, required: true },
  Risk_Name: { type: String, required: true }
});

const Risk = mongoose.model('Risk', RiskSchema);

module.exports = Risk;