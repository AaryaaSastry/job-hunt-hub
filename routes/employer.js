const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');
const Application = require('../models/Application');

// Login
router.get('/login', (req, res) => {
  res.sendFile('employer_login.html', { root: 'views' });
});

// Dashboard
router.get('/dashboard', async (req, res) => {
  const applications = await Application.find().populate('jobSeeker');
  res.sendFile('employer_dashboard.html', { root: 'views' });
});

// Post job (simplified)
router.post('/post-job', async (req, res) => {
  const { companyId, title, location, salary, description } = req.body;
  const employer = await Employer.findById(companyId);
  employer.jobs.push({ title, location, salary, description });
  await employer.save();
  res.redirect('/employer/dashboard');
});

module.exports = router;
// const employerRouter = require('./routes/employer');
// const jobRouter = require('./routes/job');