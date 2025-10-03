// here it will 
// import Express 
//  create a new Router object
var express = require('express');
var router = express.Router();




router.get('/', (req, res) => {
  res.render('index', { title: 'My Portfolio' });
});

module.exports = router;

// home page route
router.get('/', (req, res) => 
  res.render('index', { title: 'Home' })
);

// this is the about page route
router.get('/about', (req, res) => 
  res.render('about', { title: 'About Me' })
);

// projects page 
router.get('/projects', (req, res) => 
  res.render('projects', { title: 'Projects' })
);

// contact page route 
router.get('/contact', (req, res) => 
  res.render('contact', { title: 'Contact Me' })
);

// form
// contact page
router.post('/contact', express.urlencoded({ extended: false }), (req, res) => {

  const { name, email, message } = req.body || {};

  // this section is used to validate
  // if there are any field missing
  if (!name || !email || !message) {
    return res.status(400).render('contact', {
      title: 'Contact Me',
      error: 'Please fill in all fields',
      form: { name, email, message } 
    });
  }

  //  show message if all fields are filled
  res.render('contact', { 
    title: 'Contact Me', 
    flash: 'Message received, thank you!' 
  });
});


module.exports = router;
