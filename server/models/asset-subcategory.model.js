const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AsstSubCatSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Type: { type: String, required: true },
  Category: { type: String, required: true },
});

const AsstSubCat = mongoose.model('AsstSubCat', AsstSubCatSchema);

module.exports = AsstSubCat;