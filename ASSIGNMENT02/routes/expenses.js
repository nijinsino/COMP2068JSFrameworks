const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { ensureAuth } = require('../middleware/auth');

// this will help to 
// get all expenses for authenticated user
router.get('/', ensureAuth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id })
      .sort({ date: -1 })
      .lean();
    //render the expenses index view
    res.render('expenses/index', {
      title: 'My Expenses',
      expenses: expenses,
      user: req.user,
      error: req.session.error,
      success: req.session.success
    });
    //catch any errors
  } catch (error) {
    req.session.error = 'Error loading expenses.';
    res.redirect('/dashboard');
  }
});

// search expenses
router.get('/search', ensureAuth, async (req, res) => {
  try {
    const { q } = req.query;
    let expenses = [];
    // if there is a query, perform search
    if (q) {
      const searchRegex = new RegExp(q, 'i');
      expenses = await Expense.find({
        user: req.user._id,
        $or: [
          { title: searchRegex },
          { category: searchRegex },
          { description: searchRegex }
        ]
      }).sort({ date: -1 }).lean();
    } else {
      expenses = await Expense.find({ user: req.user._id })
        .sort({ date: -1 })
        .lean();
    }
    // render the expenses index view with search results
    res.render('expenses/index', {
      title: 'My Expenses',
      expenses: expenses,
      user: req.user,
      searchQuery: q,
      error: req.session.error,
      success: req.session.success
    });
  } catch (error) {
    req.session.error = 'Error searching expenses.';
    res.redirect('/expenses');
  }
});

// Add expense form
router.get('/add', ensureAuth, (req, res) => {
  res.render('expenses/add', {
    title: 'Add Expense',
    error: req.session.error
  });
});

// Create expense
router.post('/add', ensureAuth, async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;
    
    if (!title || !amount || !category || !date) {
      req.session.error = 'Title, amount, category, and date are required.';
      return res.redirect('/expenses/add');
    }
    
    const expense = new Expense({
      title,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      description,
      user: req.user._id
    });
    
    await expense.save();
    req.session.success = 'Expense added successfully!';
    res.redirect('/expenses');
  } catch (error) {
    req.session.error = 'Error adding expense.';
    res.redirect('/expenses/add');
  }
});

// Edit expense form
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!expense) {
      req.session.error = 'Expense not found.';
      return res.redirect('/expenses');
    }
    
    res.render('expenses/edit', {
      title: 'Edit Expense',
      expense: expense,
      error: req.session.error
    });
  } catch (error) {
    req.session.error = 'Error loading expense.';
    res.redirect('/expenses');
  }
});

// Update expense
router.post('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;
    
    if (!title || !amount || !category || !date) {
      req.session.error = 'Title, amount, category, and date are required.';
      return res.redirect(`/expenses/edit/${req.params.id}`);
    }
    
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        title,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        description
      },
      { new: true }
    );
    
    if (!expense) {
      req.session.error = 'Expense not found.';
      return res.redirect('/expenses');
    }
    
    req.session.success = 'Expense updated successfully!';
    res.redirect('/expenses');
  } catch (error) {
    req.session.error = 'Error updating expense.';
    res.redirect('/expenses');
  }
});

// Delete expense
router.post('/delete/:id', ensureAuth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!expense) {
      req.session.error = 'Expense not found.';
      return res.redirect('/expenses');
    }
    
    req.session.success = 'Expense deleted successfully!';
    res.redirect('/expenses');
  } catch (error) {
    req.session.error = 'Error deleting expense.';
    res.redirect('/expenses');
  }
});

module.exports = router;
