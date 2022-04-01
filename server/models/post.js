/* Post model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')

const ViewerStatusSchema = new mongoose.Schema({
    viewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ownerId"
    },
    viewStatus: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        enum: ["requested", "requst accepted", "completed", "failed"]
    }
})

const PostSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ownerId"
    },
    ownerStatus: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        enum: ["posted", "donation matched", "completed", "failed"],
        default: "posted"
    },
    viewers:{
        type: [ViewerStatusSchema],
        default: []
    },
    imageSrc: {
        type: String, // change later
        default: "./upload.png"
    },
    deliveryOption: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        enum: ["Pickup", "By Courier", "All"],
        default: "All"
    },
    header: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: null
    },
    location: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: null
    },
    description: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: null
    },
    categories: {
        type:[{
            type: String,
            minlength: 1,
            trim: true,
            enum: ["Toys, Kids, Parents", "Clothing", "Books & Stationary", "Art", "Furniture", "Shoes, Bags, Backpacks", "Music", 
                    "Sports","Electronics",  "All"]

        }],
        default: []
    },
    blocked: {
        type: Number,
        default: false
    },
    views: { 
        type: Number,
        default: 0
    },
    datePosted: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: new Date().toLocaleDateString() + " " +
                 new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"})
    },
})

PostSchema.statics.findAllPosts = function() {
    
    var posts = Post.find();

    return new Promise((resolve, reject) => {
        resolve(posts)
    })
}

function filterPostsByParams(posts, keyword, categoryVal, locationVal, deliveryOptionVal,sortDatePostedVal,sortViewsVal) {
    if (keyword.trim() !== "") {
        posts = posts.filter(post => post.header.toLowerCase().includes(keyword.trim().toLowerCase()))
    }
    if (categoryVal !== "All") {
        posts = posts.filter(post => post.categories.some(item => categoryVal === item))
    }
    if (locationVal !== "All") {
        posts = posts.filter(post => post.location === locationVal)
    }
    if (deliveryOptionVal !== "All") {
        posts = posts.filter(post => post.deliveryOption === deliveryOptionVal)
    }
    if (sortDatePostedVal === "Oldest") {
        posts = sortPosts(posts, "Oldest")
    }
    if (sortDatePostedVal === "Newest") {
        posts = sortPosts(posts, "Newest")
    }
    if (sortViewsVal === "Smallest") {
        posts = sortPosts(posts, "Smallest")
    }
    if (sortViewsVal === "Largest") {
        posts = sortPosts(posts, "Largest")
    }
    return posts;
}


function sortPosts (posts, drpdwn) {

    if (drpdwn === "Oldest") {
        posts = posts.sort((a, b) => new Date(a.datePosted.split('/')) - new Date(b.datePosted.split('/')))
    } else if (drpdwn === "Newest") {
        posts = posts.sort((a, b) => new Date(a.datePosted.split('/')) - new Date(b.datePosted.split('/'))).reverse()
    } else if (drpdwn === "Smallest") {
        posts = posts.sort((a, b) => a.views > b.views ? 1 : -1)
    } else if (drpdwn === "Largest") {
        posts = posts.sort((a, b) => a.views < b.views ? 1 : -1)
    }
    return posts
}

function filterPostsById(posts, wishlisted) {
    return posts.filter(post => wishlisted.includes(post._id))
}

// make a model using the User schema
const Post = mongoose.model('Post', PostSchema)
module.exports = { Post, filterPostsByParams, filterPostsById }
