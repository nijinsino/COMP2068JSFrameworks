var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var projectRouter = require('./routes/project');
var indexRouter = require('./routes/index');

var mongoose = require('mongoose');
var configs = require('./configs/globals');

var app = express();



//enabling cors for all requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// ---------------------
// MIDDLEWARES
// ---------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//routing setup
 // this is for browser and Angular
app.use("/projects", projectRouter);     
app.use("/api/project", projectRouter);   
// Home route
app.use('/', indexRouter);                

//this shows the database connection 
mongoose.connect(configs.ConnectionStrings.MongoDB)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));


//handles error ---------------------
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
