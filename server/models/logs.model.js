const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  Log: { type: String, required: true }
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;