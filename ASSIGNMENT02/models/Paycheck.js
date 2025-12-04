const mongoose = require('mongoose');
//

const paycheckSchema = new mongoose.Schema({
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
paycheckSchema.index({ title: 'text' });
paycheckSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Paycheck', paycheckSchema);

