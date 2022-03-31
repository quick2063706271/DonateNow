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

// export const getUser = (app) => {
//     const url = "${APP_HOST}/userpage"

//     fetch(url)
//         .then(res => {
//             if (res.status === 200) {
//                 return res.json;
//             } else {
//                 alert("Could not get user")
//             }
//         })
//         .then(json => {
//             SideMenu.setState({}) // to-do
//         })
//         .catch(error => {
//             console.log(error)
//         })
// };