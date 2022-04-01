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
                app.setState({
                    posts: json
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    
  }

  export const findPostByWishlisted = (app) => {
    console.log(app.state)
    const request = new Request(`${API_HOST}/api/posts/${app.state.userId}`, {
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
                    posts: json
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    
  }

export const createPost = (app) => {
    const url = `${API_HOST}/api/posts`;
    
    const{userId, deliveryOption, header, location, description, categories} = app.state
    // imageSrc: req.body.imageSrc
    const data = { ownerId: userId, ownerStatus: "posted",  deliveryOption, header, location, description, categories};
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
                return res.json();
            };   
        })
        .then(json => {
            if (json) {
                console.log(json)
                console.log(json.header)
                console.log(json._id)
                app.setState({
                    newPostId: json._id.toString()
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

  }