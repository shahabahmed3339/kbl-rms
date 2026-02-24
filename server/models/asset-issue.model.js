const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssetIssueSchema = new Schema({
  _id: { type: Number, required: true },
  Name: { type: String, required: true },
  IssuedID: { type: String, required: true },
  Category: { type: String, required: true },
  SubCategory: { type: String, required: true },
  Type: { type: String, required: true },
  Department: { type: String, required: true },
  Designation: { type: String, required: true },
  IssuedTo: { type: String, required: true },
  Date: { type: String, required: false },
});

const AssetIssue = mongoose.model('AssetIssue', AssetIssueSchema);

module.exports = AssetIssue;