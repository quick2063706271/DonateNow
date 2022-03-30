/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
process.env.MONGODB_URI = "mongodb+srv://donatenow:mydonatenow@cluster0.rdum2.mongodb.net/DonateNowAPI?retryWrites=true&w=majority"
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/DonateNowAPI'

mongoose.connect(mongoURI, 
   // { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
   );

module.exports = { mongoose }  // Export the active connection.