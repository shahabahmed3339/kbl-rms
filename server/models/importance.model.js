const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImportanceSchema = new Schema({
  _id: { type: Number, required: true },
  Importance: { type: String, required: true }
});

const Importance = mongoose.model('Importance', ImportanceSchema);

module.exports = Importance;