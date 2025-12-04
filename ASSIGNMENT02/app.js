require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

// Mongo + Session + Passport
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const passport = require('passport');
require('./config/passport');

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const expensesRouter = require('./routes/expenses');
const paychecksRouter = require('./routes/paychecks');
const publicRouter = require('./routes/public');

const app = express();

/* -----------------------------
   MongoDB Connection
----------------------------- */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));


/* -----------------------------
   Sessions
----------------------------- */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));


/* -----------------------------
   Passport
----------------------------- */
app.use(passport.initialize());
app.use(passport.session());
const flash = require('./middleware/flash');
app.use(flash);


/* -----------------------------
   View Engine (HBS)
----------------------------- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const helpers = require('./helpers/hbs-helpers');
hbs.registerHelper(helpers);

// Register partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));


/* -----------------------------
   Middleware
----------------------------- */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* -----------------------------
   ROUTES
----------------------------- */
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/expenses', expensesRouter);
app.use('/paychecks', paychecksRouter);
app.use('/public', publicRouter);


/* -----------------------------
   ERROR HANDLING
----------------------------- */
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
