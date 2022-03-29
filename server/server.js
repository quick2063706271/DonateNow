"use strict";

/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USER_EMAIL = ''



const express = require('express')
const path = require('path')
const app = express()

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("../db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose model
// to-do
const { User } = require("./models/user")
const { FAQ } = require('./models/faq')
const { TermsConditions } = require('./models/termsconditions') 


// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production


const CLIENT_DIR = "../client/build";

app.use(express.static(path.join(__dirname, CLIENT_DIR)));


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

app.use(
    function(req, res, next) {
        var allowedOrigins = ['http://localhost:3000'];
        var origin = req.headers.origin;
        if(allowedOrigins.indexOf(origin) > -1){
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Expose-Headers", "*");
        next();
    }
);

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
  } else {
      next()  
  }   
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
  if (env !== 'production' && USE_TEST_USER)
      req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

  if (req.session.user) {
      User.findById(req.session.user).then((user) => {
          if (!user) {
              return Promise.reject()
          } else {
              req.user = user
              next()
          }
      }).catch((error) => {
          res.status(401).send("Unauthorized")
      })
  } else {
      res.status(401).send("Unauthorized")
  }
}


/*** Session handling **************************************/
// Create a session and session cookie
app.use(
  session({
      secret: process.env.SESSION_SECRET || "odsfsdfds", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 60000,
          httpOnly: true
      },
      // store the sessions on the database in production
      store: env === 'production' ? MongoStore.create({
                                              mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/' // to-do: Add correct api 
                               }) : null
  })
);

// A route to login and create a session
// to-do

// A route to logout a user
// to-do

// A route to check if a user is logged in on the session
// to-do

/*********************************************************/

/*** API Routes below ************************************/
// User API route
// to-do

/*Create Donation Post Page*/
app.post('/createpost', mongoChecker, authenticate, function (req, res) {
    res.send('Hello World')
})

/*FAQ Page*/
app.get('FAQpage', (req, res) => {
    FAQ.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
	  }) 
}) 

/*Terms and Conditions Page*/
app.get('TermsConditions', (req, res) => {
    TermsConditions.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

/*Feedback Page*/
app.get('Feedback', (req, res) => {
    Feedback.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

app.post('Feedback', (req, res) => {
    //res.send('Post to feedback') 

    const Feedback = new Feedback ({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description, 
        isResolved: req.body.isResolved 
    })
    Feedback.save().then((rest) => {
        res.send(rest)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

/*Block List Page*/
app.get('BlockList', (req, res) => {
    User.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 



/** Item resource routes **/

app.get('/home', function (req, res) {
  res.send('Hello World')
})

app.get("/userpage", mongoChecker, authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      res.status(404).send("Resource not found")
    } else {
      res.send(user)
    }
  } catch(error) {
    log(error)
    res.status(500).send("Internal Server Error")
  }
})






/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["user"];  // to-do: add the good page
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});