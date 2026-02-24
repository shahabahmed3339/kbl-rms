const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShortListSchema = new Schema({
  _id: { type: Number, required: true },
  CVs: [{ type: String, required: true }],
  Name: [{ type: String, required: true }],
  Designation: { type: String, required: true },
});

const ShortList = mongoose.model('ShortList', ShortListSchema);

module.exports = ShortList;