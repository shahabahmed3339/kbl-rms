const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Category: { type: String, required: true },
  SubCategory: { type: String, required: true },
  Type: { type: String, required: true },
  Criticality: { type: String, required: true },
  Remarks: { type: String, required: true },
  Date: { type: String, required: false },
});

const Asset = mongoose.model('Asset', AssetSchema);

module.exports = Asset;