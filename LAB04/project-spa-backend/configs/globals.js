//this file will load environment from .env file 
require('dotenv').config();

const configurations = {
  ConnectionStrings: {
    //connection string
    MongoDB: process.env.CONNECTION_STRING_MONGODB
  },
  Authentication: {
    GitHub: {
      //github oath  
      // client id
      ClientID: process.env.GITHUB_CLIENT_ID,
      ClientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  }
};
//export all configuration

module.exports = configurations;
