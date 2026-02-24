const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExposureSchema = new Schema({
  _id: { type: Number, required: true },
  Exposr: { type: String, required: true }
});

const Exposure = mongoose.model('Exposure', ExposureSchema);

module.exports = Exposure;