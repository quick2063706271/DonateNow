// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

export const getBlocklist = (app) => {
    console.log(app.state)
    const request = new Request(`${API_HOST}/api/admin/blocklist`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                console.log(json)
                app.setState({
                    users: json
                }, () => { console.log(app.state) });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateBlocklist = (app, value) => {
    console.log(app.state)
    console.log(value)
    const request = new Request(`${API_HOST}/api/admin/blocklist/${value._id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accountBlocked: !value.accountBlocked })
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                console.log(json)
                getBlocklist(app)
            }
        })
        .catch(error => {
            console.log(error);
        });
}