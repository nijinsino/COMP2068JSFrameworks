// routes/projects.js
const express = require('express');
const router = express.Router();

// Temporary dummy data (for testing before DB)
router.get('/', (req, res) => {
  const projects = [
    { name: 'Weather App', dueDate: '2025-11-17', course: 'COMP3025' },
    { name: 'Expense Tracker', dueDate: '2025-10-31', course: 'COMP2003' }
  ];
  res.status(200).json(projects);
});

module.exports = router;
