var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Student Expense Tracker'
  });
});

router.get('/login', (req, res) => {
  res.redirect('/auth/login');
});

module.exports = router;
