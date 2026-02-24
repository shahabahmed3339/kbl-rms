const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SMSSchema = new Schema({
  _id: { type: Number, required: true },
  ClauseID: { type: String, required: true },
  Description: { type: String, required: true }
});

const SMS = mongoose.model('SMS', SMSSchema);

module.exports = SMS;