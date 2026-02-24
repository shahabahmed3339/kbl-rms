const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AsstTypeSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
});

const AsstType = mongoose.model('AsstType', AsstTypeSchema);

module.exports = AsstType;