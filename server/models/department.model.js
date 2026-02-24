const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeptSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
});

const Department = mongoose.model('Department', DeptSchema);

module.exports = Department;