const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const { ensureGuest } = require('../middleware/auth');

// ======================
// REGISTER PAGE
// ======================
router.get('/register', ensureGuest, (req, res) => {
  res.render('auth/register', { 
    title: 'Register'
  });
});

// ======================
// REGISTER POST
// ======================
router.post('/register', ensureGuest, async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      req.session.error = 'All fields are required.';
      return res.redirect('/auth/register');
    }

    if (password !== confirmPassword) {
      req.session.error = 'Passwords do not match.';
      return res.redirect('/auth/register');
    }

    if (password.length < 6) {
      req.session.error = 'Password must be at least 6 characters long.';
      return res.redirect('/auth/register');
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }]
    });

    if (existingUser) {
      req.session.error = 'User with this email or username already exists.';
      return res.redirect('/auth/register');
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    req.session.success = 'Registration successful! Please log in.';
    res.redirect('/auth/login');

  } catch (error) {
    console.error('Registration error:', error);
    req.session.error = 'An error occurred during registration.';
    res.redirect('/auth/register');
  }
});

// ======================
// LOGIN PAGE
// ======================
router.get('/login', ensureGuest, (req, res) => {
  res.render('auth/login', { 
    title: 'Login'
  });
});

// ======================
// LOGIN POST
// ======================
router.post('/login', ensureGuest, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) {
      console.error('Login error:', err);
      req.session.error = 'An error occurred.';
      return res.redirect('/auth/login');
    }

    if (!user) {
      req.session.error = info.message || 'Invalid credentials.';
      return res.redirect('/auth/login');
    }

    // Login user
    req.logIn(user, (err) => {
      if (err) {
        console.error('Session login error:', err);
        req.session.error = 'Login failed.';
        return res.redirect('/auth/login');
      }

      res.redirect('/dashboard');
    });

  })(req, res, next);
});

// ======================
// GITHUB OAUTH
// ======================
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// ======================
// LOGOUT (FIXED)
// ======================
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.success = 'Logged out successfully.';
    res.redirect('/');
  });
});

module.exports = router;
