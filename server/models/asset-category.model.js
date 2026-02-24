const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AsstCatSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Type: { type: String, required: true },
});

const AsstCat = mongoose.model('AsstCat', AsstCatSchema);

module.exports = AsstCat;