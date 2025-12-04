const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Paycheck = require('../models/Paycheck');

// Public read-only view of all expenses and paychecks
router.get('/', async (req, res) => {
  try {
    // Get all expenses and paychecks (read-only, no user filtering)
    const expenses = await Expense.find()
      .populate('user', 'username')
      .sort({ date: -1 })
      .limit(50)
      .lean();
    
    const paychecks = await Paycheck.find()
      .populate('user', 'username')
      .sort({ date: -1 })
      .limit(50)
      .lean();
    
    res.render('public', {
      title: 'Public View - All Transactions',
      expenses: expenses,
      paychecks: paychecks
    });
  } catch (error) {
    console.error('Public view error:', error);
    res.render('public', {
      title: 'Public View - All Transactions',
      expenses: [],
      paychecks: [],
      error: 'Error loading transactions.'
    });
  }
});

module.exports = router;


