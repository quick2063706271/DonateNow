// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

export const getTermsConditions = (app) => {
    console.log(app.state)
    const request = new Request(`${API_HOST}/api/termsconditions`, {
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
                    terms: json
                }, () => { console.log(app.state) });
            }
        })
        .catch(error => {
            console.log(error);
        });
}