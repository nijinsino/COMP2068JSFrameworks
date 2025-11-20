const mongoose = require('mongoose');
// define the Project schema
const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  course: { type: String, required: true }
});

module.exports = mongoose.model('Project', ProjectSchema);
