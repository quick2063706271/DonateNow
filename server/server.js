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

const morgan = require('morgan')
app.use(morgan('combined'))

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
// mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose model
const { User, filterByAdmin, filterByAccountBlocked, filterByEmail } = require("./models/user")
const { Faq } = require('./models/faq')
const { TermsConditions } = require('./models/termsconditions') 
const { Feedbacks } = require('./models/feedbacks') 
const { Post, filterPostsByParams, filterPostsById, filterPostsByOwnerId, filterPostsByViewerId} = require('./models/post') 
const { PostImage} = require("./models/postImage")
const { UserImage} = require("./models/userImage")

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dvskgtzrl',
    api_key: '745427798474762',
    api_secret: '9-ZCrUUDwXaLnLNem08qMvZLxyE'
});

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo'); // to store session information on the database in production

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
app.set('trust proxy', 1)
app.use(
  session({
      secret: process.env.SESSION_SECRET || "odsfsdfds", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: new Date(Date.now() + 6000000),
          secure: false,
          proxy : true,
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
                if (!err) {}
                else { err; }
            });
            if (user.accountBlocked) {
                res.status(400).send({ success: false, message: "This account is blocked. Please contact the admin."})
            } else {
                res.status(200).send({ success: true, message: "Successfully Logged in." });
            }
        })
        .catch(error => {
            res.status(400).send({ success: false, message: "Failed to log in."})
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
            res.status(200).send(newPost)
        })
        .catch(error => {
            if (isMongoError(error)) {
                res.status(500).send("Internal server error")
            }
            else {
                return res.status(400).send(error);
            }
        })
})

/* Wishlist */
app.get('/api/posts/:id', mongoChecker, authenticate, function(req, res) {
    User.findById(req.params.id)
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
                    })
            }
        }).catch((err) => {
            res.status(500).send(err)
        }) 
})



/* Search Page  */
app.get('/api/filterposts', mongoChecker, function(req, res) {
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

/* Post Page*/
app.get('/api/post/:id', mongoChecker, function(req, res) {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found') // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}
    Post.findById(id).then((post) => {
		if (!post) {
			res.status(404).send('Resource not found')  // could not find this restaurant
		} else {  
			res.status(200).send(post)
		}
	})
    .catch((error) => {
		res.status(500).send('Internal Server Error')  // server error
	})
})

/* Get Post WishList Count */
app.get('/api/post/wishlist/:id', mongoChecker, function(req, res) {
    const pid = req.params.id
    if (!ObjectID.isValid(pid)) {
		res.status(404).send('Resource not found') // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    User.find()
        .then((users) => {
            let count = 0
            users.map(
                (user) => {
                    if (user.wishlisted.length > 0){
                        user.wishlisted.filter((wishlist) => {
                            if (wishlist.toString() == pid){
                                count += 1
                            }
                        })
                    }
                })
            res.status(200).send(count.toString())
        }).catch((err) => {
            res.status(500).send('Internal Server Error')
        }) 
})

/* add to WishList*/
app.patch('/api/post/wishlist/:uid/:pid',mongoChecker, function(req, res){
    const uid = req.params.uid
    const pid = req.params.pid

    if (!ObjectID.isValid(uid)) {
		res.status(404).send('Resource not found') // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    User.findOneAndUpdate({_id: uid}, { $push: {wishlisted: pid}},{ new: true})
        .then((user) => {
            if (!user) {
                res.status(404).send('Resource not found')  // could not find this restaurant
            } else {
                res.status(200).send(user)
            }
        })
        .catch((error) => {
            res.status(500).send('Internal Server Error')  // server error
        })
})

/* remove from wishlist */
app.patch('/api/post/unwishlist/:uid/:pid',mongoChecker, function(req, res){
    const uid = req.params.uid
    const pid = req.params.pid

    if (!ObjectID.isValid(uid)) {
		res.status(404).send('Resource not found') // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    User.findOneAndUpdate({_id: uid}, { $pull: {wishlisted: pid}},{ new: true})
        .then((user) => {
            if (!user) {
                res.status(404).send('Resource not found')  // could not find this restaurant
            } else {
                res.status(200).send(user)
            }
        })
        .catch((error) => {
            res.status(500).send('Internal Server Error')  // server error
        })
})



/* Increment Views*/
app.patch('/api/post/views/:id', mongoChecker, function(req, res) {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found') // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    Post.findOneAndUpdate({_id: id}, 
                          { $inc: {"views": 1}},{new: true})
        .then((post) => {
            if (!post) {
                res.status(404).send('Resource not found')  // could not find this restaurant
            } else {
                res.status(200).send(post)
            }
	    })
        .catch((error) => {
            res.status(500).send('Internal Server Error')  // server error
        })
})

/* Change Owner Status */
app.patch('/api/post/:id', mongoChecker, function(req, res) {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found') // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    Post.findOneAndUpdate({_id: id}, 
                          { $set: {"ownerStatus": req.body.val}},{new: true})
        .then((post) => {
            if (!post) {
                res.status(404).send('Resource not found')  // could not find this restaurant
            } else {
                res.status(200).send(post)
            }
	    })
        .catch((error) => {
            res.status(500).send('Internal Server Error')  // server error
        })
})

/* Change Viewer Status */
app.patch('/api/post/:id/:viewer_id', mongoChecker, function(req, res) {
    const id = req.params.id
    const vid = req.params.viewer_id

    if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found') // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

    Post.findOneAndUpdate({_id: id}, 
							{   $set: {"viewers.$[el].viewerStatus": req.body.val}},
							{
								arrayFilters: [{ "el.viewerId": vid }],
								new: true
							}
							)
        .then((post) => {
            if (!post) {
                res.status(404).send('Resource not found')  // could not find this restaurant
            } else {
                res.status(200).send(post)
            }
	    })
        .catch((error) => {
            res.status(500).send('Internal Server Error')  // server error
        })
})

/* Add Viewer Status */
app.post('/api/post/:id/:viewer_id', mongoChecker, function(req, res) {
    const id = req.params.id
    const vid = req.params.viewer_id

    if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found') // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}
    const viewer = new Object({
        viewerId: vid,
        viewerStatus: req.body.val
    })

    Post.findOneAndUpdate({_id: id}, 
							{   $push: {viewers: viewer}},
							{
								new: true
							}
							)
        .then((post) => {
            if (!post) {
                res.status(404).send('Resource not found')  // could not find this restaurant
            } else {
                res.status(200).send(post)
            }
	    })
        .catch((error) => {
            res.status(500).send('Internal Server Error')  // server error
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

/* Create Terms and Conditions */
app.post('/api/termsconditions', mongoChecker, async (req, res) => {
    // Create a new post
    const termsConditions = new TermsConditions({
        header: req.body.header,
        description: req.body.description
    })

    termsConditions.save()
        .then((newTermsConditions) => {
            res.status(200).send({
                termsconditions: newTermsConditions
            })
        })
        .catch(error => {
            if (isMongoError(error)) {
                res.status(500).send("Internal server error")
            }
            else {
                return res.status(400).send(error);
            }
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
        const filtered = filterByAdmin(result)
        res.send(filtered)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

/*Admin User Profile Page*/
app.get('/api/admin/userprofile/:email', mongoChecker, authenticate, checkAdmin, (req, res) => {
    User.find().then((result) => {
        const filtered = filterByEmail(result, req.params.email.toString())
        res.send(filtered)
    }).catch((error) => {
        res.status(500).send(error)
    })
}) 

app.patch('/api/admin/blocklist/:userId', mongoChecker, authenticate, checkAdmin, (req, res) => {
    const user_id = req.params.userId

    User.findById({_id: user_id}).then((result) => {
        result.accountBlocked = req.body.accountBlocked 
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
    res.status(500).send("Internal Server Error")
  }
})

/* User Page get other user */
app.get("/api/userpage/other/:id", mongoChecker, authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404).send("Resource not found")
    } else {
      res.send(user)
    }
  } catch(error) {
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
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
  }
})

// Post Feedback
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

// Get donated History Posts
app.get("/api/userpage/donatedHistory", async (req, res) => {
  try {
    const posts = await Post.findAllPosts()
    if (!posts) {
      res.status(404).send("Posts not found")
    }
    const filtered = await filterPostsByOwnerId(posts, req.session.user)
    if (!filtered) {
      res.status(404).send("Filtered not found")
    } else {
      res.send(filtered)
    }
  } catch(error) {
    res.status(500).send("Internal Server Error")
  }
})

// Get Transaction History Posts
app.get("/api/userpage/transactedHistory", async (req, res) => {
  try {
    const posts = await Post.findAllPosts()
    if (!posts) {
      res.status(404).send("Posts not found")
    }
    const filtered = await filterPostsByViewerId(posts, req.session.user)
    if (!filtered) {
      res.status(404).send("Filtered not found")
    } else {
      res.send(filtered)
    }
  } catch(error) {
    res.status(500).send("Internal Server Error")
  }
})

// Get Donated History Posts By ID
app.get("/api/userpage/donatedHistory/:postid", async (req, res) => {

  const postId = req.params.postid
  try{
    const post = await Post.findById(postId)
    if(!post) {
      res.status(404).send("Post not found")
    }
    const viewerIds = post.viewers.map((viewer) => viewer.viewerId)
    const viewers = await User.find().where('_id').in(viewerIds)
    if(!viewers) {
      res.status(404).send("Viewers not found")
    } else {
      res.send(viewers)
    }
  } catch(error) {
    res.status(500).send("Internal Server Error")
  }
})

/*** Routes for Image Uploader ************************************/

// a POST route to *create* an image
app.post("/images/post", multipartMiddleware, (req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {

            // Create a new image using the Image mongoose model
            
            var img = new PostImage({
                image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
            });
            
            // Save image to the database
            img.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});


// a POST route to *create* a user image
app.post("/images/user/:uid", multipartMiddleware, (req, res) => {
    const uid = req.params.uid

    UserImage.deleteMany({"userId": uid})
        .then(images => {
            // Use uploader.upload API to upload image to cloudinary server.
            cloudinary.uploader.upload(
                req.files.image.path, // req.files contains uploaded files
                function (result) {
                    // Create a new image using the Image mongoose model
                    
                    var img = new UserImage({
                        userId: uid,
                        image_id: result.public_id, // image id on cloudinary server
                        image_url: result.url, // image url on cloudinary server
                    });
                    
                    // Save image to the database
                    img.save().then(
                        saveRes => {
                            res.send(saveRes);
                        },
                        error => {
                            res.status(400).send(error); // 400 for bad request
                        }
                    );
                });
        })
});
// a GET route to get post image by id
app.get("/images/post/:id", (req, res) => {
    const imageId = req.params.id;

    PostImage.findById(imageId).then(
        image => {
            res.send( image ); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// a GET route to get user image by id
app.get("/images/user/:uid", (req, res) => {
    const uid = req.params.uid;

    UserImage.findOne({userId: uid}).then(
        image => {
            res.send( image ); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/// a DELETE route to remove an image by its id.
app.delete("/images/:imageId", (req, res) => {
    const imageId = req.params.imageId;

    // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
    // on the cloudinary server
    cloudinary.uploader.destroy(imageId, function (result) {

        // Delete the image from the database
        Image.findOneAndRemove({ image_id: imageId })
            .then(img => {
                if (!img) {
                    res.status(404).send();
                } else {
                    res.send(img);
                }
            })
            .catch(error => {
                res.status(500).send(); // server error, could not delete.
            });
    });
});



/*** Webpage routes below **********************************/

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

const public_routes = ["/", "/search", "/wishlist", "/createpost","/termsconditions", "/admin/feedback", 
                       "/admin/blocklist", "/userpage", "/postpage/:id", "/userpage/:id"]
for (let i = 0; i < public_routes.length; i++) {
    let route = public_routes[i];
    app.get(route, (req, res) => {
        res.sendFile(path.resolve(__dirname, CLIENT_DIR, 'index.html'))
    });
}

// All routes other than above will go to index.html
// app.get("*", (req, res) => {
//     res.sendFile(__dirname + "/client/build/index.html");
// });

/*************************************************/
// Express server listening...
const port = process.env.PORT || 6001;
app.listen(port, () => {
    log(`Running ${env}. Listening on port ${port}...`);
});