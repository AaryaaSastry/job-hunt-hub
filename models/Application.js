const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobTitle: String,
  jobId: String,
  jobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker' },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  status: { type: String, default: "Applied" },
  resumeLink: String
});

module.exports = mongoose.model('Application', applicationSchema);
