// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

export const getFeedbacks = (app) => {
    const request = new Request(`${API_HOST}/api/admin/feedback`, {
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
                app.setState({
                    feedbacks: json
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}