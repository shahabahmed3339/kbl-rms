const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FacilitySchema = new Schema({
  _id: { type: Number, required: true },
  Facility: { type: String, required: true },
});

const Facility = mongoose.model('Facility', FacilitySchema);

module.exports = Facility;