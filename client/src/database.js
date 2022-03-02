import toys from "./toys.png"
import clothes from "./clothes.png"
import monitor from "./monitor.png"

let ownerStatuses = ["posted", "donation matched", "completed", "failed"]

let viewerStatuses = ["requested", "requst accepted", "completed", "failed"]

let transactions = [
    {
        // ownerId:
        // viwerId:
        // ownerStatus:
        // viewerStatus: 
    }
]

let posts = [

    { 
        postId: 1,
        img_src: toys, 
        delivery_option: {"Pickup": 1, "Delivery": 0},
        header: "Toys for Kids 5-6 Year Olds",
        location: "Toronto, ON",
        description: "I bought the toys 2 years ago for my son, almost as new. He has new toys now and we wish to give away to kids who may like it. " +
        "Please request only if you can pick it up in Toronto DT, thanks.",
        categories: {"clothing": 0, "Toys, Kids, Parents": 1, "Art": 0, "Furniture": 0, "Books": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        blocked: 0,
        // transaction
        views: 50,
        Requests: 12,	 
        Saved: 26
    },

    { 
        postId: 2,
        img_src: monitor,
        delivery_option: {"Pickup": 0, "By Courier": 1},
        header: "Monitor from Microhard",
        location: "Toronto, ON",
        description: "I bought the monitor 2 years ago for my son, almost as new. He has new monitor now and we wish to give away to kids who may like it. ",
        categories: {"clothing": 1, "Toys, Kids, Parents": 1, "Art": 0, "Furniture": 0, "Books": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        // owner: {userId: ownerStatus}
        // viewers: [userId: viewerStatus],
        views: 65,	
        requests: 20, 
        Saved: 32
    },

    { 
        postId: 3,
        img_src: clothes,
        delivery_option: {"Pickup": 0, "By Courier": 1},
        header: "Clothes for Kids 5-6 Year Olds",
        location: "Toronto, ON",
        description: "My son grows really fast, these clothes are almost new. We wish to give away to kids who may need it. ",
        categories: {"clothing": 1, "Toys, Kids, Parents": 1, "Art": 0, "Furniture": 0, "Books": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        // owner: {userId: ownerStatus}
        // viewers: [userId: viewerStatus],
        views: 65,	
        requests: 20, 
        Saved: 32
    }
]

let users = [
    {
        userId: 1,
        username: "user@user.com",
        password: "user",
        // User profile stuff
        // Wishlisted [postId]
        // Donated [postId]
        // Transaction [postId]
    }
]

export default {posts, users}