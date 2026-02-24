const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ISMSSchema = new Schema({
  _id: { type: Number, required: true },
  ClauseID: { type: String, required: true },
  Description: { type: String, required: true }
});

const ISMS = mongoose.model('ISMS', ISMSSchema);

module.exports = ISMS;