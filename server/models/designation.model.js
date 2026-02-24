const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DesignationSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  Department: { type: String, required: true },
});

const Designation = mongoose.model('Designation', DesignationSchema);

module.exports = Designation;