const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware — make sure this is before your routes
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true, // Uncomment if you serve over HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day session duration (optional)
  }
}));

// Route handlers
app.use('/', require('./routes/auth'));           // Authentication routes
app.use('/employer', require('./routes/employer'));
app.use('/jobseeker', require('./routes/jobseeker'));

// HTML page routes (optional: serve pages directly)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/jobseeker/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'jobseeker_register.html'));
});

app.get('/jobseeker/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'jobseeker_dashboard.html'));
});

app.get('/employer/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'employer_login.html'));
});

app.get('/employer/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'employer_dashboard.html'));
});

app.get('/jobseeker/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/employer/options', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'employer_options.html'));
});
// Catch-all route for 404 errors

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
