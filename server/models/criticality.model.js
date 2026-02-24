const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CriticalitySchema = new Schema({
  _id: { type: Number, required: true },
  Criticality: { type: String, required: true },
});

const Criticality = mongoose.model('Criticality', CriticalitySchema);

module.exports = Criticality;