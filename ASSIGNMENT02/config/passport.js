require('dotenv').config();
// Passport configuration
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

//passport local strategy
//here it handles standard email and password login
passport.use(
  new LocalStrategy(
    {
        //this will tell the strategy to look for 'email' and 'password' fields in the request body
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Normalize email to lowercase 
        const normalizedEmail = email.toLowerCase().trim();
        console.log('Login attempt for email:', normalizedEmail);
        //this will find the user by email      
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
          console.log('User not found for email:', normalizedEmail);
          return done(null, false, { message: 'Incorrect email or password.' });
        }


        console.log('Comparing password for user:', user.email);
        const isMatch = await user.comparePassword(password);
        console.log('Password match result:', isMatch);
        
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        console.log('Login successful for user:', user.email);
        return done(null, user);
      } catch (error) {
        console.error('Passport local strategy error:', error);
        return done(error);
      }
    }
  )
);

//this is how passport stores and retrieves users 
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//fetch the user object from database
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;

