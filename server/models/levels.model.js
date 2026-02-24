const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LevelSchema = new Schema({
  _id: { type: Number, required: true },
  Level: { type: Number, required: true },
  Description: { type: String, required: true },
});

const Level = mongoose.model('Level', LevelSchema);

module.exports = Level;