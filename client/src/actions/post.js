// environment configutations
import ENV from './../config.js'

const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)
  
export const findPostByKeyword = (app, keyword) => {
    console.log(ENV.api_host)
    let url = `${API_HOST}/api/filterposts?`;
    const {categoryVal, locationVal, deliveryOptionVal,sortDatePostedVal, sortViewsVal} = app.state
    const params = {keyword, categoryVal, locationVal, deliveryOptionVal,sortDatePostedVal, sortViewsVal}
    Object.keys(params).forEach(key => {
        url = url + key + "=" + params[key] + "&&"
    })

    console.log(url)

    fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                console.log(json)
                app.setState({
                    posts: json
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    
  }