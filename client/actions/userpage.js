  // environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)


export const getStudent = (app) => {
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
            SideMenu.setState({}) // to-do
        })
        .catch(error => {
            console.log(error)
        })
};