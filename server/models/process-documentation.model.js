const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrDocSchema = new Schema({
  _id: { type: Number, required: true },
  PrName: { type: String, required: true },
  DocType: { type: String, required: true },
});

const PrDoc = mongoose.model('PrDoc', PrDocSchema);

module.exports = PrDoc;