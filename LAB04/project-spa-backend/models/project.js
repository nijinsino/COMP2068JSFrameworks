const mongoose = require('mongoose');
//defining project schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  course: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema, 'projects');
