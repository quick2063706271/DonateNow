  // environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

export const userSignUp = (app, email, password) => {
    const url = `${API_HOST}/api/createanaccount`;
    const data = { email, password };
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 200) {
                app.setState({
                    error: false,
                    valid: true
                });
            }
            return res.json();
        })
        .then(json => {
            if (json && !json.userId) {
                app.setState({
                    error: true,
                    errormsg: JSON.stringify(json)
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app, callback = () => {}) => {
    const url = `${API_HOST}/check-session`;

    if (!ENV.use_frontend_test_user) {
        fetch(url, {
            credentials: 'include'
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.userId) {
                app.setState({
                    userId: json.userId,
                    admin: json.admin
                }, () => {
                    if (callback instanceof Function) {
                        callback();
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    } else {
        app.setState({ userId: ENV.user });
    }
    
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

// A function to send a POST request with the user to be logged in
export const login = (app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/login`, {
        method: "post",
        body: JSON.stringify({
            email: app.state.email,
            password: app.state.password
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => res.json())
        .then(json => {
            if (json && json.success) {
                app.setState({
                    countdown: 2,
                    initialState: false,
                    error: false,
                    message: ""
                }, () => {
                    const countdown = setInterval(() => {
                        app.setState({
                            countdown: app.state.countdown - 1,
                            message: `Successfully signed in. Redirecting in ${app.state.countdown - 1} seconds`
                        });
                        if (app.state.countdown <= 0) {
                            window.location.href = "/search?keyword=";
                            clearInterval(countdown);
                        }
                    }, 1000)}
                )
            } else {
                app.setState({
                    initialState: false,
                    error: true,
                    message: json.message
                })
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = `${API_HOST}/logout`;

    fetch(url)
        .then(res => {
            app.setState({
                userId: null,
            });
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to find user profile of a user
export const getUser = (app) => {
    const url = `${API_HOST}/api/userpage`

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get user")
            }
        })
        .then(json => {
            app.setState({
                username: json.username,
                email: json.email,
                dateOfBirth: json.dateOfBirth,
                gender: json.gender,
                phone: json.phone,
                preference: json.preference,
                bio: json.bio,
                complaintNum: json.complaintNum,
                accountBlocked: json.accountBlocked,
                admin: json.admin,
                address1: json.address1,
                address2: json.address2
            }) 
        })
        .catch(error => {
            console.log(error)
            alert("Could not set State")
        })
};

export const getOtherUser = (app) => {
    const url = `${API_HOST}/api/userpage/other/${app.state.userId}`

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get user")
            }
        })
        .then(json => {
            app.setState({
                username: json.username,
                email: json.email,
                dateOfBirth: json.dateOfBirth,
                gender: json.gender,
                phone: json.phone,
                preference: json.preference,
                bio: json.bio,
                complaintNum: json.complaintNum,
                accountBlocked: json.accountBlocked,
                address1: json.address1,
                address2: json.address2,
                thisUserId: json._id
            }) 
        })
        .catch(error => {
            console.log(error)
            alert("Could not set State")
        })
};

// A functon to update the User form state
export const updateUserForm = (PersonalInformation, field) => {
    const value = field.value;
    const name = field.name;
    PersonalInformation.setState({
        [name]: value
    });
};
// [
    // 	{"op": "replace", "path": "/username", "value": "test1"}, 
    // 	{"op": "replace", "path": "/phone", "value": 12341234}
    // ]
export const updateUser = (PersonalInformation) => {
    PersonalInformation.setState({
        isEdit: false
    });

    const url = `${API_HOST}/api/userpage`
    const patchData = [
        {"op": "replace", "path": "/username", "value": PersonalInformation.state.username},
        {"op": "replace", "path": "/dateOfBirth", "value": PersonalInformation.state.dateOfBirth},
        {"op": "replace", "path": "/gender", "value": PersonalInformation.state.gender},
        {"op": "replace", "path": "/address1", "value": PersonalInformation.state.address1},
        {"op": "replace", "path": "/address2", "value": PersonalInformation.state.address2},
        {"op": "replace", "path": "/phone", "value": PersonalInformation.state.phone},
        {"op": "replace", "path": "/preference", "value": PersonalInformation.state.preference},
        {"op": "replace", "path": "/bio", "value": PersonalInformation.state.bio}
    ]
    const request = new Request(url, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(patchData)
    })
    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                PersonalInformation.setState({
                    message: {
                        body: "Success: Updated a user.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                PersonalInformation.setState({
                    message: {
                        body: "Error: Could not update a user.",
                        type: "error"
                    }
                });
            }
            return(res.json())
        })
        .catch(error => {
            console.log(error);
        });

}

// A function to send a POST request for feedbackl
export const addFeedback = (Feedback) => {
    // the URL for the request
    const url = `${API_HOST}/api/userpage`;

    // The data we are going to send in our request
    if (Feedback.state.title === "" || Feedback.state.content === "") {
        Feedback.setState({
            message: {
                body: "Error: You must fill in all entries to submit!",
                type: "Error"
            }
        });
        return
    }
    const feedback = {
        title: Feedback.state.title,
        content: Feedback.state.content
    }
    

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                Feedback.setState({
                    message: {
                        body: "Success: Added a feedback.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the feedback, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                Feedback.setState({
                    message: {
                        body: "Error: Could not add feedback.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to find user profile of a user
export const getDonationHistory = (app, callback = () => {}) => {
    const url = `${API_HOST}/api/userpage/donatedHistory`

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get donationHistory")
            }
        })
        .then(json => {
            app.setState({
                donationPosts: json
            },
            () => {
                if (callback instanceof Function) {
                    callback();
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
};

export const getTransactionHistory = (app, callback = () => {}) => {
    const url = `${API_HOST}/api/userpage/transactedHistory`

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get donationHistory")
            }
        })
        .then(json => {
            app.setState({
                transactionPosts: json
            },
            () => {
                if (callback instanceof Function) {
                    callback();
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
};


export const getDoneeInformation = (app) => {
    const url = `${API_HOST}/api/userpage/donatedHistory/${app.state.postId}`
    
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get DoneeInformation")
            }
        })
        .then(json => {
            app.setState({
                donees: json
            }) 
        })
        .catch(error => {
            console.log(error)
        })
}

export const addWishlist = (userId, postId) => {
    const url = `${API_HOST}/api/post/wishlist/${userId}/${postId}`

    fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            };   
        })
        .catch(error => {
            console.log(error);
        });
}

export const removeWishlist = (userId, postId, refresh) => {
    const url = `${API_HOST}/api/post/unwishlist/${userId}/${postId}`

    fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
    })
        .then(res => {
            if (res.status === 200) {
                if (refresh){
                    window.location.reload(false)
                }
                return res.json();
            };   
        })
        .catch(error => {
            console.log(error);
        });
}

// A function to find user profile of a user
export const getUserByEmail = (app, email, callback = () => {}) => {
    const url = `${API_HOST}/api/admin/userprofile/${email}`

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get user by email")
            }
        })
        .then(json => {
            app.setState({
                profileUser: json
            }, () => {
                if (callback instanceof Function) {
                    callback();
                }
            })
        })
        .catch(error => {
            console.log(error)
            alert("Could not set State")
        })
};