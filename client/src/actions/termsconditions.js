  // environment configutations
  import ENV from './../config.js'
  const API_HOST = ENV.api_host
  // console.log('Current environment:', ENV.env)
  
  export const getTermsConditions = (app) => {
    const url = `${API_HOST}/api/termsconditions`;
   
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json;
            } 
        })
        .then(json => {
            if (json) {
                app.setState({
                    terms: JSON.stringify(json)
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    
  }