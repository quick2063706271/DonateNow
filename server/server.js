"use strict";
const log = console.log;
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
const { mongoose } = require("./db/mongoose");
// mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose model
// to-do


const { User } = require("./actions/login")
const { Faq } = require('./models/faq')
const { TermsConditions } = require('./models/termsconditions') 
const { Feedbacks } = require('./models/feedbacks') 


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
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByEmailPassword(email, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            res.send({ currentUser: user.email });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a user is logged in on the session
app.get("/check-session", (req, res) => {
    if (env !== 'production' && USE_TEST_USER) { // test user on development environment.
        req.session.user = TEST_USER_ID;
        req.session.email = TEST_USER_EMAIL;
        res.send({ currentUser: TEST_USER_EMAIL })
        return;
    }

    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/
/* Create Account */
app.post('/createanaccount', mongoChecker, async (req, res) => {
    log(req.body)

    // Create a new user
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    try {
        // Save the user
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

/*Create Donation Post Page*/
app.post('/createpost', function (req, res) {
    res.send('Hello World')
})

/*FAQ Page*/
app.get('/faqpage', (req, res) => {
    Faq.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
	  }) 
}) 

/*Terms and Conditions Page*/
app.get('/termsconditions', (req, res) => {
    TermsConditions.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

/*Feedback Page*/
app.get('/admin/feedback', (req, res) => {
    Feedbacks.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

app.post('/admin/feedback', (req, res) => {
    //res.send('Post to feedback') 

    const Feedback = new Feedbacks ({
        feedbackId: req.body.feedbackId, 
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content, 
        isResolved: req.body.isResolved 
    })
    Feedback.save().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

app.patch('/admin/feedback/:id', (req, res) => {
    Feedback.findOne({_id:req.params.id}).then((result) => {
        let resolved = req.body.isResolved 
        result.isResolved = resolved 
        result.save().then((patchedRest) => {
            res.send({Feedback: patchedRest})
        }).catch((error) => {
            res.status(500).send(error)
        })
    }).catch((error) => {
        res.status(500).send(error)
    })
})


/*Block List Page*/
app.get('/admin/blocklist', (req, res) => {
    User.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

app.patch('/admin/blocklist/:userId', (req, res) => {
    // BlockList.findOne({_id:req.params.id}).then((result) => {
    //     let blocked = req.body.accountBlocked 
    //     let userId = req.body.userId 
    //     //find and update user in the blocklist 
    //     const user = User.findById(userId)
    //     user.accountBlocked = blocked  
    //     result.save().then((patchedRest) => {
    //         res.send({uId: userId, BlockList: patchedRest})
    //     }).catch((error) => {
    //         res.status(500).send(error)
    //     })
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
    const user_id = req.params.userId

    User.findOne({userId: user_id}).then((result) => {
        result.accountBlocked = req.body.blocked 
        result.save().then((patchedRest) => {
            res.send({accountBlcked: patchedRest})
        }).catch((error) => {
            res.status(500).send(error)
        })
    }).catch((error) => {
        res.status(500).send(error)
    })
})


/* User Page */
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

app.patch("/userpage", mongoChecker, authenticate, async (req, res) => {
  const fieldsToUpdate = {}
  req.body.map((change) => {
    const propertyToChange = change.path.substr(1)
    fieldsToUpdate[propertyToChange] = change.value
  })
  try {
    const user = await User.findOneAndUpdate({_id: req.user._id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
    if (!user) {
      res.status(404).send("Resource not found")
    } else {
      res.send(user)
    }
  } catch(error) {
    log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
  }
})



app.get('/home', function (req, res) {
  res.send('Hello World')
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
const port = process.env.PORT || 6001;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});