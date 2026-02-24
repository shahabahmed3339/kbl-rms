const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;