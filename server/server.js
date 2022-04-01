"use strict";
const log = console.log;
/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

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
const { User } = require("./models/user")
const { Faq } = require('./models/faq')
const { TermsConditions } = require('./models/termsconditions') 
const { Feedbacks } = require('./models/feedbacks') 
const { Post, filterPostsByParams, filterPostsById } = require('./models/post') 

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

const checkAdmin = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (user.admin == false) {
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
          expires: 6000000,
          secure: false
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
            req.session.user = user._id.toString();
            req.session.email = user.email; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            req.session.admin = user.admin;
            req.session.save((err) => {
                if (!err) {
                    log(req.session)
                    console.log('token is saved!')
                } else {
                    throw err;
                }
            });
            res.status(200).send({ success: true, message: "Successfully Logged in" });
        })
        .catch(error => {
            res.status(400).send({ success: false, message: "Fail to log in."})
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
    console.log(req.session)
    if (req.session.user) {
        res.send({
            userId: req.session.user,
            admin: req.session.admin
        })
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/
/* Create Account */
app.post('/api/createanaccount', mongoChecker, async (req, res) => {
    log(req.body)

    // Create a new user
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save()
        .then((newUser) => {
            res.status(200).send({
                userId: newUser._id
            })
        })
        .catch(error => {
            if (isMongoError(error)) {
                res.status(500).send("Internal server error")
            }
            else if (error.name === "ValidationError") {
                let errors = {};
          
                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });

                return res.status(400).send(errors);
            }
            res.status(500).send("Internal server error")
        })
})

/* Create Post */
app.post('/api/posts', mongoChecker, /*authenticate,*/ async (req, res) => {
    log(req.body)

    // Create a new post
    const post = new Post({
        ownerId:  req.body.ownerId,
        ownerStatus: req.body.ownerStatus,
        viewers: [],
        imageSrc: req.body.imageSrc,
        deliveryOption: req.body.deliveryOption,
        header: req.body.header,
        location: req.body.location,
        description: req.body.description,
        categories: req.body.categories
    })

    post.save()
        .then((newPost) => {
            res.status(200).send({
                post: newPost
            })
        })
        .catch(error => {
            if (isMongoError(error)) {
                res.status(500).send("Internal server error")
            }
            else {
                return res.status(400).send(error);
            }
            res.status(500).send("Internal server error")
        })
})

/* Wishlist */
app.get('/api/posts/:id', mongoChecker, /*authenticate,*/ function(req, res) {
    console.log(req.body)
    console.log(req.params.id)
    User.findWishlistedByUser(req.params.id)
        .then((user) => {
            if (!user) {
                res.status(404).send("Resource not found")
            }
            else {
                const wishlisted = user.wishlisted
                Post.findAllPosts()
                    .then((result) => {
                        const filtered = filterPostsById(result, wishlisted)
                        res.send(filtered)
                    }).catch((err) => {
                        res.status(500).send(err)
                    })
            }
        }).catch((err) => {
            res.status(500).send(err)
        }) 
})

/* Search Page  */
app.get('/api/filterposts', mongoChecker, function(req, res) {
    console.log(req.query)
    Post.findAllPosts()
        .then((result) => {
            const filtered = filterPostsByParams(
                result, req.query.keyword, req.query.categoryVal, req.query.locationVal,
                req.query.deliveryOptionVal, req.query.sortDatePostedVal, req.query.sortViewsVal
            )
            res.send(filtered)
        }).catch((err) => {
            res.status(500).send(err)
        }) 
})


/*FAQ Page*/
app.get('/api/faqpage', mongoChecker,(req, res) => {
    Faq.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
	  }) 
}) 

/*Terms and Conditions Page*/
app.get('/api/termsconditions', mongoChecker, (req, res) => {
    TermsConditions.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

/*Feedback Page*/
/* Should authenticate user and verify user is admin */
app.get('/api/admin/feedback', mongoChecker, authenticate, checkAdmin, (req, res) => {
    Feedbacks.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 


app.patch('/api/admin/feedback/:id', mongoChecker, authenticate, checkAdmin, (req, res) => {
    Feedbacks.findOne({_id:req.params.id}).then((result) => {
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
app.get('/api/admin/blocklist', mongoChecker, authenticate, checkAdmin, (req, res) => {
    User.find().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

app.patch('/api/admin/blocklist/:userId', mongoChecker, authenticate, checkAdmin, (req, res) => {
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
app.get("/api/userpage", mongoChecker, authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.session.user)
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

/* User Page Patch*/
// sennd at this format
//  [
// 	{"op": "replace", "path": "/username", "value": "test1"}, 
// 	{"op": "replace", "path": "/phone", "value": 12341234}
// ]

app.patch("/api/userpage", mongoChecker, authenticate, async (req, res) => {
  const fieldsToUpdate = {}
  console.log(req.body)
  req.body.map((change) => {
    const propertyToChange = change.path.substr(1)
    fieldsToUpdate[propertyToChange] = change.value
  })
  try {
    const user = await User.findOneAndUpdate({_id: req.session.user}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
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

app.post('/api/userpage', (req, res) => {
  const Feedback = new Feedbacks ({
      userId: req.session.user,
      title: req.body.title,
      content: req.body.content
  })
  Feedback.save().then((result) => {
      res.send(result)
  }).catch((error) => {
      res.status(500).send(error)
  })
}) 

// app.get('/home', function (req, res) {
//   res.send('Hello World')
// })

app.use(express.static(path.join(__dirname, CLIENT_DIR)));

const routes = ["/login", "/createanaccount"]
for (let i = 0; i < routes.length; i++) {
    let route = routes[i];
    app.get(route, (req, res) => {
        if (req.session.user) {
            res.redirect("/");
        } else {
            res.sendFile(path.resolve(__dirname, CLIENT_DIR, 'index.html'))
        }
    });
}

const public_routes = ["/", "/search", "/wishlist", "/termsconditions", "/admin/feedback", "/userpage"]
for (let i = 0; i < routes.length; i++) {
    let route = public_routes[i];
    app.get(route, (req, res) => {
        res.sendFile(path.resolve(__dirname, CLIENT_DIR, 'index.html'))
    });
}


/*************************************************/
// Express server listening...
const port = process.env.PORT || 6001;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});


