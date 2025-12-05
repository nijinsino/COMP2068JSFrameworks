var express = require('express');
var router = express.Router();
// Home page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Student Expense Tracker'
  });
});
// Redirect to login
router.get('/login', (req, res) => {
  res.redirect('/auth/login');
});

module.exports = router;
