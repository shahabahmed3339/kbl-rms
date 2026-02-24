const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VulnerabilitySchema = new Schema({
  _id: { type: Number, required: true },
  Vulnrblt: { type: String, required: true }
});

const Vulnerability = mongoose.model('Vulnerability', VulnerabilitySchema);

module.exports = Vulnerability;