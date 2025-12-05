const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Paycheck = require('../models/Paycheck');
const { ensureAuth } = require('../middleware/auth');

// Dashboard with charts and insights
router.get('/', ensureAuth, async (req, res) => {
  try {
    const userId = req.user._id;
//this will fetch all expenses and paychecks for the logged-in user
    const expenses = await Expense.find({ user: userId }).lean();
    const paychecks = await Paycheck.find({ user: userId }).lean();
//this is the structure
//to hold income and expenses per month
    const monthlyData = {};
//this will help to populate monthlyData with expenses and income
    expenses.forEach(expense => {
      //convert data into a readable month-year format
      const month = new Date(expense.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      //if this month is not yet in monthlyData
      // it will initialize it
      if (!monthlyData[month]) {
        monthlyData[month] = { expenses: 0, income: 0 };
      }
      monthlyData[month].expenses += expense.amount;
    });
//this part of code is similar logic for paychecks to populate income
    paychecks.forEach(paycheck => {
      const month = new Date(paycheck.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!monthlyData[month]) {
        monthlyData[month] = { expenses: 0, income: 0 };
      }
      //add income to monthly total
      monthlyData[month].income += paycheck.amount;
    });
//calculate totals
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


    const isSavingsPositive = totalSavings > 0;

    // insight message
    let insightMessage = '';
    if (currentMonthSavings > 0) {
      insightMessage = `Great job! You saved $${currentMonthSavings.toFixed(2)} this month.`;
    } else if (currentMonthSavings < 0) {
      insightMessage = `You overspent $${Math.abs(currentMonthSavings).toFixed(2)} this month.`;
    } else {
      insightMessage = 'Your income and expenses are balanced this month.';
    }
//render the dashboard view with all calculated data
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
      isSavingsPositive   
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    req.session.error = 'Error loading dashboard.';
    res.redirect('/');
  }
});

module.exports = router;
