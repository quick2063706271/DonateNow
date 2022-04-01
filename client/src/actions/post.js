  // environment configutations
  import ENV from './../config.js'
  const API_HOST = ENV.api_host
  // console.log('Current environment:', ENV.env)
  
  export const findPostByKeyword = (app, keyword) => {
    const url = `${API_HOST}/filterposts`;
    const {categoryVal, locationVal, deliveryOptionVal,sortDatePostedVal} = app.state
    const data = {keyword, categoryVal, locationVal, deliveryOptionVal,sortDatePostedVal}
    fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && !json.userId) {
                app.setState({
                    posts: JSON.stringify(json)
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    
  }