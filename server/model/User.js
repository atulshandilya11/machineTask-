// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  mobile: String,
  zipCode: { type: String, required: true },
  profilePic: String,
  lat: Number,
  long: Number,
  token: String,
});
// userSchema.index({ location: '2dsphere' });
const User = mongoose.model('User', userSchema);

module.exports = User;
