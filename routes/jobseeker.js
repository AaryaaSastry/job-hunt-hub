const express = require('express');
const router = express.Router();
const JobSeeker = require('../models/JobSeeker');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await JobSeeker.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const newJobSeeker = new JobSeeker({
      username,
      password,  // 🔐 Auto-hashed via schema pre-save hook
      email
    });

    await newJobSeeker.save();

    // Redirect with query param for success alert
    res.redirect('/jobseeker/login?registered=true');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

 
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await JobSeeker.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid username or password');
    }

    req.session.userId = user._id;
    res.redirect('/jobseeker/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
