# Student Expense Tracker

A comprehensive web application for international students to manage their finances, track expenses, monitor paychecks, and gain insights into their financial health.

## Live Site
[Add your live site URL here after deployment]

## GitHub Repository
[Add your GitHub repository URL here]

## Description

The Student Expense and Paycheck Tracker assists international students in managing their finances effectively. It enables users to document all their spending (rent, grocery, utility, etc.) and earnings (part-time paychecks) with specific dates. Through this application, students can view their savings and financial health information, including monthly income and expenses, and compare total income with expenses to determine whether their spending is healthy.

## Why This Application is Useful

As a student studying in a foreign country, it is not an easy task to handle finances due to unpredictable earnings and numerous bills. This app stores all money outlay and earnings information within a single location and automatically provides insights. Students are able to monitor their spending and determine their monthly spending and monthly savings. It also shows charts and summaries that make it easier to understand how much they spend.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login with local authentication and GitHub OAuth
- **Expense Management**: Full CRUD operations for tracking expenses with categories (Rent, Grocery, Utility, Transportation, Entertainment, Education, Other)
- **Paycheck Management**: Full CRUD operations for tracking income/paychecks
- **Public View**: Read-only view of all transactions (no add/edit/delete functionality)
- **Dashboard**: Overview with total income, expenses, savings, and monthly insights

### Additional Features

#### 1. Keyword Search
Users can search for their expenses or paychecks by title, category, and month. For example, if you search for "rent" or "January", you will see all the matching records. The search uses MongoDB regex for flexible pattern matching.

**Implementation**: 
- Search routes implemented in `/expenses/search` and `/paychecks/search`
- Uses MongoDB regex queries to search across title, category, and description fields
- Search is case-insensitive and supports partial matches

#### 2. Charts and Insights
The application uses Chart.js to display visual charts showing total income and total expenses for each month. The app also provides personalized messages such as "Your savings this month" or "You overspent this much amount."

**Implementation**:
- Chart.js library integrated for data visualization
- Monthly bar charts comparing income vs expenses
- Automatic calculation of monthly savings
- Insight messages based on financial performance
- Color-coded visualizations (green for income, red for expenses)

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (Local Strategy + GitHub OAuth)
- **View Engine**: Handlebars (HBS)
- **Frontend**: Bootstrap 5, Custom CSS
- **Charts**: Chart.js
- **Session Management**: express-session with MongoDB store

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ASSIGNMENT02
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file or update `config/database.js` with your MongoDB connection string
   - Update GitHub OAuth credentials in `config/passport.js` or set environment variables:
     - `GITHUB_CLIENT_ID`
     - `GITHUB_CLIENT_SECRET`
     - `GITHUB_CALLBACK_URL`
   - Set `SESSION_SECRET` environment variable for session security

4. Start the application:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
ASSIGNMENT02/
├── config/
│   ├── database.js          # MongoDB connection configuration
│   └── passport.js          # Passport authentication strategies
├── helpers/
│   └── hbs-helpers.js       # Handlebars helper functions
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── flash.js             # Flash message middleware
├── models/
│   ├── User.js              # User model
│   ├── Expense.js           # Expense model
│   └── Paycheck.js          # Paycheck model
├── public/
│   ├── stylesheets/
│   │   └── style.css        # Custom CSS
│   └── javascripts/          # Client-side JavaScript
├── routes/
│   ├── index.js             # Home page route
│   ├── auth.js              # Authentication routes
│   ├── dashboard.js         # Dashboard route
│   ├── expenses.js          # Expense CRUD routes
│   ├── paychecks.js         # Paycheck CRUD routes
│   └── public.js            # Public read-only route
├── views/
│   ├── partials/
│   │   ├── header.hbs       # Shared header
│   │   └── footer.hbs       # Shared footer
│   ├── auth/
│   │   ├── login.hbs        # Login page
│   │   └── register.hbs     # Registration page
│   ├── expenses/
│   │   ├── index.hbs        # Expense list
│   │   ├── add.hbs          # Add expense form
│   │   └── edit.hbs         # Edit expense form
│   ├── paychecks/
│   │   ├── index.hbs        # Paycheck list
│   │   ├── add.hbs          # Add paycheck form
│   │   └── edit.hbs         # Edit paycheck form
│   ├── dashboard.hbs        # Dashboard with charts
│   ├── public.hbs           # Public read-only view
│   ├── index.hbs            # Home page
│   ├── layout.hbs           # Main layout
│   └── error.hbs            # Error page
├── app.js                   # Main application file
├── package.json             # Dependencies
└── README.md               # This file
```

## CSS Styling

The application uses a combination of Bootstrap 5 and custom CSS:

- **Bootstrap**: Used for responsive layout, grid system, and UI components
- **Custom CSS**: 
  - Color scheme: Blue for header/primary elements, Green for income, Red for expenses
  - Custom animations and transitions
  - Professional styling for cards, forms, and tables
  - Responsive design for mobile devices

## Database Schema

### User Model
- username (String, unique, required)
- email (String, unique, required)
- password (String, hashed with bcrypt)
- githubId (String, optional for GitHub OAuth)
- createdAt (Date)

### Expense Model
- title (String, required)
- amount (Number, required, min: 0)
- category (String, enum: Rent, Grocery, Utility, Transportation, Entertainment, Education, Other)
- date (Date, required)
- description (String, optional)
- user (ObjectId, reference to User)
- createdAt (Date)

### Paycheck Model
- title (String, required)
- amount (Number, required, min: 0)
- date (Date, required)
- description (String, optional)
- user (ObjectId, reference to User)
- createdAt (Date)

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- Protected routes with authentication middleware
- MongoDB injection prevention through Mongoose
- Secure session storage in MongoDB

## Deployment

The application is designed to be deployed on cloud platforms such as:
- Render (Recommended)
- Azure
- Heroku
- AWS
- Digital Ocean

Make sure to set the following environment variables in your deployment platform:
- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Secret key for session encryption
- `GITHUB_CLIENT_ID`: GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth client secret
- `GITHUB_CALLBACK_URL`: GitHub OAuth callback URL

## Student Information

- **Name**: Nijin Sino
- **Student Number**: 200594634
- **Course**: COMP 2068 - JavaScript Frameworks
- **Assignment**: Assignment 2B

## License

This project is created for educational purposes as part of COMP 2068 course requirements.

