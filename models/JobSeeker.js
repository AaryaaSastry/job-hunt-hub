const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jobSeekerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true },
  password: { type: String, required: true }
});


jobSeekerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
