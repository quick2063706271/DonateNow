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
                address1: json.address[0],
                address2: json.address[1],
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