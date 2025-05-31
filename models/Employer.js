const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  companyName: String,
  email: String,
  password: String,
  jobs: [{
    title: String,
    location: String,
    salary: String,
    description: String,
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
  }]
});

module.exports = mongoose.model('Employer', employerSchema);
