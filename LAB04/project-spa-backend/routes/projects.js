const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving projects', error: err });
  }
});
// POST create new project
router.post('/', async (req, res) => {
  try {
    const projectToSave = {
      name: req.body.name,
      dueDate: req.body.dueDate,
      course: req.body.course
    };
//this will create and save the new project
    const newProject = await Project.create(projectToSave);
    res.status(201).json(newProject);

  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json(err);
  }
});
// DELETE project
router.delete('/:id', async (req, res) => {
  try {
   //this will delete the project with id
    await Project.deleteOne({ _id: req.params.id });
    res.sendStatus(204); // success: no content
  } catch (err) {
   //
    console.error("Error deleting project:", err);
    res.status(400).json(err);
  }
});
// UPDATE project

router.put('/', async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
    // return updated object
      { new: true }  
    );

    res.status(202).json(updated);

  } catch (err) {
    console.error("Error updating project:", err);
    res.status(400).json(err);
  }
});



module.exports = router;
