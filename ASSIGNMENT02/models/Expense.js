const mongoose = require('mongoose');
// Expense Schema
const expenseSchema = new mongoose.Schema({
  //this is the fields for expenses
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Rent', 'Grocery', 'Utility', 'Transportation', 'Entertainment', 'Education', 'Other'],
    default: 'Other'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search functionality
expenseSchema.index({ title: 'text', category: 'text' });
expenseSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);


