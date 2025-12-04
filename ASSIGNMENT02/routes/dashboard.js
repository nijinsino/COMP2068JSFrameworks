const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Paycheck = require('../models/Paycheck');
const { ensureAuth } = require('../middleware/auth');

// Dashboard with charts and insights
router.get('/', ensureAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId }).lean();
    const paychecks = await Paycheck.find({ user: userId }).lean();

    const monthlyData = {};

    expenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!monthlyData[month]) {
        monthlyData[month] = { expenses: 0, income: 0 };
      }
      monthlyData[month].expenses += expense.amount;
    });

    paychecks.forEach(paycheck => {
      const month = new Date(paycheck.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!monthlyData[month]) {
        monthlyData[month] = { expenses: 0, income: 0 };
      }
      monthlyData[month].income += paycheck.amount;
    });

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = paychecks.reduce((sum, p) => sum + p.amount, 0);
    const totalSavings = totalIncome - totalExpenses;

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const currentMonthData = monthlyData[currentMonth] || { expenses: 0, income: 0 };
    const currentMonthSavings = currentMonthData.income - currentMonthData.expenses;

    const months = Object.keys(monthlyData).sort();
    const incomeData = months.map(month => monthlyData[month].income);
    const expenseData = months.map(month => monthlyData[month].expenses);

    // Create boolean for color logic in template
    const isSavingsPositive = totalSavings > 0;

    // Insight message
    let insightMessage = '';
    if (currentMonthSavings > 0) {
      insightMessage = `Great job! You saved $${currentMonthSavings.toFixed(2)} this month.`;
    } else if (currentMonthSavings < 0) {
      insightMessage = `You overspent $${Math.abs(currentMonthSavings).toFixed(2)} this month.`;
    } else {
      insightMessage = 'Your income and expenses are balanced this month.';
    }

    res.render('dashboard', {
      title: 'Dashboard',
      user: req.user,
      totalExpenses: totalExpenses.toFixed(2),
      totalIncome: totalIncome.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      currentMonthSavings: currentMonthSavings.toFixed(2),
      insightMessage,
      months,
      incomeData,
      expenseData,
      monthlyData,
      isSavingsPositive   // <-- IMPORTANT FIX
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    req.session.error = 'Error loading dashboard.';
    res.redirect('/');
  }
});

module.exports = router;
