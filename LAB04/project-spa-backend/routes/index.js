const express = require('express');
const router = express.Router();

//get home page
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Project SPA Backend',
    message: 'MongoDB connection successful!',
   
  });
});

module.exports = router;
