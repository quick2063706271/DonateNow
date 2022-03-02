import toys from "./toys.png"
import clothes from "./clothes.png"
import monitor from "./monitor.png"
import marker from "./marker.png"

let ownerStatuses = ["posted", "donation matched", "completed", "failed"]

let viewerStatuses = ["requested", "requst accepted", "completed", "failed"]

let transactions = [
    {
        postId: 3,
        ownerId: 1, 
        viwerId: 2,
        ownerStatus: "requested",
        viewerStatus: "posted",
        requestDate: "2020-01-01"
    },
    {
        postId: 2,
        ownerId: 1, 
        viwerId: 2,
        ownerStatus: "failed",
        viewerStatus: "failed",
        requestDate: "2020-02-01"
    },
    {
        postId: 1,
        ownerId: 2, 
        viwerId: 1,
        ownerStatus: "donation matched",
        viewerStatus: "requested accepted",
        requestDate: "2020-03-01"
    },

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
        username: "John2022",
        password: "12341234",
        dateOfBirth: "1990-01-01",
        gender: "male",
        address1: "1 King St W, Toronto, ON M5C 1T4",
        address2: "4650 Eglinton Ave W, Etobicoke, ON M9R 4C8",
        phone: "123-456-7890",
        email: "John2022@gmail.com",
        preference: "Books, Travel",
        bio: "I enjoy reading books and gaming and travelling and travelling and travelling."
        // User profile stuff
        // Wishlisted [postId]
        // Donated [postId]
        // Transaction [postId]
    },
    {
        userId: 2,
        username: "Jolene1997",
        password: "12345678",
        dateOfBirth: "2000-01-01",
        gender: "female",
        address1: "3 Queen St W, Toronto, ON M5Y 1Y4",
        address2: "4651 Eglinton Ave W, Etobicoke, ON M9R 4C8",
        phone: "123-456-7891",
        email: "Jolene1997@gmail.com",
        preference: "Food, Travel",
        bio: "I enjoy reading food and gaming and travelling and travelling and travelling."
        // User profile stuff
        // Wishlisted [postId]
        // Donated [postId]
        // Transaction [postId]
    }
]

export default {posts, users, transactions}