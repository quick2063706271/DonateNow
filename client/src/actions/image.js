// environment configutations
import ENV from './../config.js'

const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

// A function to send a POST request with a new image
export const addPostImage = (form, app) => {
    // the URL for the request
    const url = `${API_HOST}/images/post`;

    // The data we are going to send in our request
    const imageData = new FormData(form);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "POST",
        body: imageData,
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                app.setState({
                    message: {
                        body: "Success: Added an image.",
                        type: "success"
                    }
                });
                return res.json()
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                app.setState({
                    message: {
                        body: "Error: Could not add image.",
                        type: "error"
                    }
                });
                return null;
            }
        }).then(json => {
            if (json){
                app.setState(
                    {imageId: json._id.toString()}
                )
            }
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to send a POST request with a new image
export const addUserImage = (form, app, userId) => {
    // the URL for the request
    const url = `${API_HOST}/images/user/${userId}`;


    // The data we are going to send in our request
    const imageData = new FormData(form);
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "POST",
        body: imageData,
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                app.setState({
                    message: {
                        body: "Success: Added an image.",
                        type: "success"
                    }
                });
                return res.json()
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                app.setState({
                    message: {
                        body: "Error: Could not add image.",
                        type: "error"
                    }
                })
                ;return null;
            }
        })
        .then(json => {
            if (json){
                app.setState(
                    {image: json}
                )
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getPostsImages = (app) => {

    app.state.posts.map((post) => {
        // the URL for the request
        const url = `${API_HOST}/images/post/${post.imageSrc}`;

        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    alert("Could not get images");
                    return {}
                }
            })
            .then(json => {
                const images = app.state.images
                images[json._id] = json
                app.setState({
                    images: images
                })
            })
            .catch(error => {
                console.log(error)
            });
    })
};

export const getHistoryPostsImages = (app) => {

    app.state.donationPosts.map((post) => {
        // the URL for the request
        const url = `${API_HOST}/images/post/${post.imageSrc}`;

        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    alert("Could not get images");
                    return {}
                }
            })
            .then(json => {
                const images = app.state.images
                images[json._id] = json
                app.setState({
                    images: images
                })
            })
            .catch(error => {
                console.log(error)
            });
    })
    app.state.transactionPosts.map((post) => {
        // the URL for the request
        const url = `${API_HOST}/images/post/${post.imageSrc}`;

        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    alert("Could not get images");
                    return {}
                }
            })
            .then(json => {
                const images = app.state.images
                images[json._id] = json
                app.setState({
                    images: images
                })
            })
            .catch(error => {
                console.log(error)
            });
    })
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each image
export const getImageById = (app, imageId) => {
    // the URL for the request
    const url = `${API_HOST}/images/post/${imageId}`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get images");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            app.setState({ 
                image:json}
            );
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each image
export const getUserImageById = (app, userId) => {
    // the URL for the request
    const url = `${API_HOST}/images/user/${userId}`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get images");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            app.setState(
                { image:json }
            );
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to send a DELETE request with an image PUBLIC id (id on cloudinary)
export const deleteImage = (imageId, dashboardComp, imageListComp) => {
    // the URL for the request
    const url = `/images/${imageId}`;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "delete",
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was deleted successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Delete successful.",
                        type: "success"
                    }
                });

                // Also remove the image from the imageList state
                // Use filter to only keep the images you want.
                const filteredList = imageListComp.state.imageList.filter(img => img.image_id !== imageId);
                imageListComp.setState(
                    { imageList: filteredList }
                );

            } else {
                // If server couldn't delete the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not delete image.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}