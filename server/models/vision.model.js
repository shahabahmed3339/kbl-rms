const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VisionSchema = new Schema({
  _id: { type: Number, required: true },
  Vision: { type: String, required: true },
  Description: { type: String, required: true },
  From: { type: String, required: true },
  To: { type: String, required: true },
  Outcome: { type: String, required: true }
});

const Vision = mongoose.model('Vision', VisionSchema);

module.exports = Vision;