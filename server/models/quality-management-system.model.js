const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QMSSchema = new Schema({
  _id: { type: Number, required: true },
  ClauseID: { type: String, required: true },
  Description: { type: String, required: true }
});

const QMS = mongoose.model('QMS', QMSSchema);

module.exports = QMS;