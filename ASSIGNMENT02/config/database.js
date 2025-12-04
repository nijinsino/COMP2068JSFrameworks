
//this will load the environment variables from the .env file
require('dotenv').config();
// config/database.js   
module.exports = {
  mongoURI: process.env.MONGODB_URI
};
