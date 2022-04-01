  // environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = `${API_HOST}/check-session`;

    if (!ENV.use_frontend_test_user) {
        fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.userId) {
                app.setState({ userId: json.userId });
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
export const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/login`, {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.userId !== undefined) {
                //app.setUserId({ userId: json.userId });
                app.setUserId(json.userId, json.admin)
                loginComp.setLoginState(json.userId, false, true, json.admin)
            }
        })
        .catch(error => {
            console.log(error);
            loginComp.setLoginState(-1, true, false, false)
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = `${API_HOST}/logout`;

    fetch(url)
        .then(res => {
            app.setState({
                userId: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to find user profile of a user
export const getUser = (app) => {
    const url = "${APP_HOST}/userpage"

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json;
            } else {
                alert("Could not get user")
            }
        })
        .then(json => {
            app.setState({
                username: json.username,
                password: json.password,
                dateOfBirth: json.dateOfBirth,
                gender: json.gender,
                address: json.address,
                phone: json.phone,
                email: json.email,
                preference: json.preference,
                bio: json.bio,
                complaintNum: json.complaintNum,
                accountBlocked: json.accountBlocked,
                admin: json.admin,
            }) 
        })
        .catch(error => {
            console.log(error)
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

    const url = "${APP_HOST}/userpage"

    const patchData = [
        {"op": "replace", "path": "/username", "value": PersonalInformation.state.username},
        {"op": "replace", "path": "/password", "value": PersonalInformation.state.password},
        {"op": "replace", "path": "/dateOfBirth", "value": PersonalInformation.state.dateOfBirth},
        {"op": "replace", "path": "/gender", "value": PersonalInformation.state.gender},
        {"op": "replace", "path": "/address", "value": [PersonalInformation.state.address1, PersonalInformation.state.address2]},
        {"op": "replace", "path": "/phone", "value": PersonalInformation.state.phone},
        {"op": "replace", "path": "/preference", "value": PersonalInformation.state.preference},
        {"op": "replace", "path": "/bio", "value": PersonalInformation.state.bio}
    ]

    const request = new Request(url, {
        method: "patch",
        body: JSON.stringify(patchData),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
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
        })
        .catch(error => {
            console.log(error);
        });

}

// A function to send a POST request for feedbackl
export const addFeedback = (Feedback) => {
    // the URL for the request
    const url = `${API_HOST}/userpage`;

    // The data we are going to send in our request
    if (this.state.title === "" || this.state.content === "") {
        console.log("error: empty feedback")
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
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
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
