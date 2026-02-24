const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RolesSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

module.exports = Role = mongoose.model("roles", RolesSchema);
