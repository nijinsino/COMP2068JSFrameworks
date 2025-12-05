# Student Expense Tracker

A comprehensive web application for international students to manage their finances, track expenses, monitor paychecks, and gain insights into their financial health.

## Live Site
[Add your live site URL here after deployment]

## GitHub Repository
[Add your GitHub repository URL here]

## main features
in this app 
* you can ADD,EDIT,DELETE expenses like rent,groceries,etc
* add, edit and delete paychecks
* you can see the dashboard with charts showing the charts for income vs expenses
* see how much we saved or overspent each month

## small description why I build this

* as a student in another country, handling money can be confusing, like the expenses come from everywhere, so in this app we can see how much we usually spend in a month, check if you are saving or overspending

## Tech Used

*Node.js + Express
*MongoDB (Mongoose)
*Passport.js for login
*Handlebars (HBS)
*Bootstrap 5
*chart.js
*express-session + MongoDB store

## how to run 
* clone the repo
*cd ASSIGNMENT02
* npm install

* create .env file and add
PORT=3000

MONGODB_URI=mongodb+srv://studentDB:StudentDB123@expensetracker.08tfrlj.mongodb.net/ExpenseTracker?retryWrites=true&w=majority

SESSION_SECRET=someStrongSecret123

PORT=3000

MONGODB_URI=mongodb+srv://studentDB:StudentDB123@expensetracker.08tfrlj.mongodb.net/ExpenseTracker?retryWrites=true&w=majority

SESSION_SECRET=someStrongSecret123

GITHUB_CLIENT_ID=placeholder
GITHUB_CLIENT_SECRET=placeholder
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback


* then start the server by npm start
* go to http://localhost:3000

## middleware and passport function i have used here

* Middleware makes sure only the right people access the right pages.
* it will check whether the user is logged in(ensureAUTH)
* this show flash/success/error messages

Passport handles everything about logging in, checking passwords, and keeping users logged in using sessions.
*  Login (email + password)
*Checks if the user exists
*Validates the password
*Creates a session so the user stays logged in


##
live link


https://expensetracker-70ls.onrender.com/