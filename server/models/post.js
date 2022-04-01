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
    viewers: [ViewerStatusSchema],
    imageSrc: {
        type: String, // change later
        default: "default image src"
    },
    deliveryOption: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        default: null
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
            enum: ["Toys", "Kids", "Parents", "Interests", "Electronics", "Clothing", "Books & Stationary", "All"]
        }],
        default: []
    },
    blocked: {
        type: Number,
        default: 0
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
        default: "00/00/0000"
    },
})



PostSchema.statics.findPostByKeyword = function(keyword, categoryVal, locationVal, deliveryOptionVal,sortDatePostedVal,sortViewsVal) {
    
    var posts = Post.find();

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
        posts = sortPosts("Oldest")
    }
    if (sortDatePostedVal === "Newest") {
        posts = sortPosts("Newest")
    }
    if (sortViewsVal === "Smallest") {
        posts = sortPosts("Smallest")
    }
    if (sortViewsVal === "Largest") {
        posts = sortPosts("Largest")
    }
    return new Promise((resolve, reject) => {
        resolve(posts)
    })
}

function sortPosts (drpdwn) {

    var posts = Post.find();

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

// make a model using the User schema
const Post = mongoose.model('Post', PostSchema)
module.exports = { Post }