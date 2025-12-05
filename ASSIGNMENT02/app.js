
//this will load environment variables
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

// Mongo + Session + Passport authentication
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
// Passport config
const passport = require('passport');
require('./config/passport');

// Routes modules
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const expensesRouter = require('./routes/expenses');
const paychecksRouter = require('./routes/paychecks');


const app = express();

//mongoose connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));


app.use(session({
  //key to used to sign session cookies
  secret: process.env.SESSION_SECRET,
  //resave session on each request
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    //store session data in MongoDB
    mongoUrl: process.env.MONGODB_URI
  }),
  //session lifespan set to 1 day
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//this is the custom flash middleware
const flash = require('./middleware/flash');
app.use(flash);


// view engine setup
//this is used for rendering frontend views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const helpers = require('./helpers/hbs-helpers');
hbs.registerHelper(helpers);

// Register partials like navbar,footer..
hbs.registerPartials(path.join(__dirname, 'views/partials'));


//main middleware
// this will log requests to the console

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

//routes setup
  //  These connect each URL path to its route file

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/expenses', expensesRouter);
app.use('/paychecks', paychecksRouter);



//error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // Log the error
  console.error('Error occurred:', err);
  console.error('Error stack:', err.stack);
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
