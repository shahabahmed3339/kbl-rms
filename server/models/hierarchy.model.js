const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HierarchySchema = new Schema({
  _id: { type: Number, required: true },
  Department: { type: String, required: true },
  Designation: { type: String, required: true },
  Level: { type: Number, required: true },
  JobDesc: [{ type: String, required: true }],
  Auth: [{ type: String, required: true }],
});

const Hierarchy = mongoose.model('Hierarchy', HierarchySchema);

module.exports = Hierarchy;