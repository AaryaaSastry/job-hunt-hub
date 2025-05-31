const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'views' });
});

module.exports = router;
// const authRouter = require('./routes/auth');
// const jobRouter = require('./routes/job');  