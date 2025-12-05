const express = require('express');
const router = express.Router();
const Paycheck = require('../models/Paycheck');
const { ensureAuth } = require('../middleware/auth'); // FIXED

// get all paychecks for authenticated user
router.get('/', ensureAuth, async (req, res) => {
  try {
    const paychecks = await Paycheck.find({ user: req.user._id })
      .sort({ date: -1 })
      .lean();
//render the paychecks index view
    res.render('paychecks/index', {
      title: 'My Paychecks',
      paychecks,
      user: req.user,
      error: req.session.error,
      success: req.session.success
    });
//catch any errors
  } catch (error) {
    req.session.error = 'Error loading paychecks.';
    res.redirect('/dashboard');
  }
});

// Search paychecks
router.get('/search', ensureAuth, async (req, res) => {
  try {
    const { q } = req.query;
    let paychecks = [];

    if (q) {
      const searchRegex = new RegExp(q, 'i');
      paychecks = await Paycheck.find({
        user: req.user._id,
        $or: [
          { title: searchRegex },
          { description: searchRegex }
        ]
      }).sort({ date: -1 }).lean();
    } else {
      paychecks = await Paycheck.find({ user: req.user._id })
        .sort({ date: -1 })
        .lean();
    }
// render the paychecks index view with search results
    res.render('paychecks/index', {
      title: 'My Paychecks',
      paychecks,
      user: req.user,
      searchQuery: q,
      error: req.session.error,
      success: req.session.success
    });

  } catch (error) {
    req.session.error = 'Error searching paychecks.';
    res.redirect('/paychecks');
  }
});

// Add paycheck form
router.get('/add', ensureAuth, (req, res) => {
  res.render('paychecks/add', {
    title: 'Add Paycheck',
    error: req.session.error
  });
});

// Create paycheck
router.post('/add', ensureAuth, async (req, res) => {
  try {
    const { title, amount, date, description } = req.body;

    if (!title || !amount || !date) {
      req.session.error = 'Title, amount, and date are required.';
      return res.redirect('/paychecks/add');
    }

    const paycheck = new Paycheck({
      title,
      amount: parseFloat(amount),
      date: new Date(date),
      description,
      user: req.user._id
    });

    await paycheck.save();
    req.session.success = 'Paycheck added successfully!';
    res.redirect('/paychecks');

  } catch (error) {
    req.session.error = 'Error adding paycheck.';
    res.redirect('/paychecks/add');
  }
});

// Edit paycheck form
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const paycheck = await Paycheck.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!paycheck) {
      req.session.error = 'Paycheck not found.';
      return res.redirect('/paychecks');
    }

    res.render('paychecks/edit', {
      title: 'Edit Paycheck',
      paycheck,
      error: req.session.error
    });

  } catch (error) {
    req.session.error = 'Error loading paycheck.';
    res.redirect('/paychecks');
  }
});

// Update paycheck
router.post('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const { title, amount, date, description } = req.body;

    if (!title || !amount || !date) {
      req.session.error = 'Title, amount, and date are required.';
      return res.redirect(`/paychecks/edit/${req.params.id}`);
    }

    const paycheck = await Paycheck.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        title,
        amount: parseFloat(amount),
        date: new Date(date),
        description
      },
      { new: true }
    );

    if (!paycheck) {
      req.session.error = 'Paycheck not found.';
      return res.redirect('/paychecks');
    }

    req.session.success = 'Paycheck updated successfully!';
    res.redirect('/paychecks');

  } catch (error) {
    req.session.error = 'Error updating paycheck.';
    res.redirect('/paychecks');
  }
});

// Delete paycheck
router.post('/delete/:id', ensureAuth, async (req, res) => {
  try {
    const paycheck = await Paycheck.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!paycheck) {
      req.session.error = 'Paycheck not found.';
      return res.redirect('/paychecks');
    }

    req.session.success = 'Paycheck deleted successfully!';
    res.redirect('/paychecks');

  } catch (error) {
    req.session.error = 'Error deleting paycheck.';
    res.redirect('/paychecks');
  }
});

module.exports = router;
