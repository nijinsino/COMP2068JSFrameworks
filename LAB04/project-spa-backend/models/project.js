const mongoose = require('mongoose');

// Define the schema for a Project
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  course: {
    type: String,
    required: true
  }
});

// Create the model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
