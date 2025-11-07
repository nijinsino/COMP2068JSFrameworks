const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'My Portfolio' });
});

// About page
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

// Projects page
router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Me' });
});

// Contact form submit
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).render('contact', {
      title: 'Contact Me',
      error: 'Please fill in all fields.',
      form: { name, email, message }
    });
  }

  // rediret
  return res.redirect('/?sent=true');
});

module.exports = router;
