import toys from "./toys.png"
import clothes from "./clothes.png"
import monitor from "./monitor.png"
import marker from "./marker.png"

// let ownerStatuses = ["posted", "donation matched", "completed", "failed"]

// let viewerStatuses = ["requested", "requst accepted", "completed", "failed"]

let transactions = [
    {   
        //case 1: posted
        postId: 1,
        ownerId: 1,
        viwerIds: -1, // -1 means no viewer
        ownerStatus: "posted",
        viewerStatus: ""
    },

    {   //case 2: posted, some viewers requested
        postId: 2,
        ownerId: 2,
        viwerId: 1,
        ownerStatus: "posted",
        viewerStatus: "requested"
    },

    { 
        postId: 2,
        ownerId: 2,
        viwerIds: 3,
        ownerStatus: "posted",
        viewerStatus: "requested"
    },

    {   //case 3: donor has chosen 1 donnee
        postId: 3,
        ownerId: 3,
        viwerIds: 1,
        ownerStatus: {3: "donation matched"},
        viewerStatuses: "failed",
    },

    {   
        postId: 3,
        ownerId: 3,
        viwerIds: 2,
        ownerStatus: "donation matched",
        viewerStatus: "requst accepted"
    },

    {   //case 4: posted, some viewers requested
        postId: 4,
        ownerId: 4,
        viwerIds: 1,
        ownerStatus: "completed",
        viewerStatus: "failed"
    },

    {   
        postId: 4,
        ownerId: 4,
        viwerIds: 2,
        ownerStatus: "completed",
        viewerStatus: "completed"
    },

    {   
        postId: 4,
        ownerId: 4,
        viwerIds: 3,
        ownerStatus: "completed",
        viewerStatus: "failed"
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
        categories: {"clothing": 0, "Toys, Kids, Parents": 1, "Art": 0, "Furniture": 0, "Books & Stationary": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        blocked: 0,
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
        categories: {"clothing": 1, "Toys, Kids, Parents": 1, "Art": 0, "Furniture": 0, "Books & Stationary": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
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
        categories: {"clothing": 1, "Toys, Kids, Parents": 1, "Art": 0, "Furniture": 0, "Books & Stationary": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        views: 65,	
        requests: 20, 
        Saved: 32
    },

    { 
        postId: 4,
        img_src: marker,
        delivery_option: {"Pickup": 1, "By Courier": 0},
        header: "Marker",
        location: "Toronto, ON",
        description: "Some spare markers. Please pick it up",
        categories: {"clothing": 0, "Toys, Kids, Parents": 0, "Art": 0, "Furniture": 0, "Books & Stationary": 1, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
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
        preference: "Books & Stationary, Travel",
        bio: "I enjoy reading Books & Stationary and gaming and travelling and travelling and travelling.",
        Wishlisted: [2,4],
        Donated: [1],
        transaction: [2, 3, 4]
    },
    {
        userId: 2,
        username: "user@user.com",
        password: "user",
        dateOfBirth: "1998-01-01",
        gender: "male",
        address1: "1000 King St W, Toronto, ON M5C 1T4",
        address2: "4650 Eglinton Ave W, Etobicoke, ON M9R 4C8",
        phone: "123-456-7890",
        email: "user@user.com",
        preference: "Books & Stationary, Travel",
        bio: "I enjoy reading Books & Stationary and gaming and travelling and travelling and travelling.",
        Wishlisted: [1, 3, 4],
        Donated: [2],
        transaction: [3, 4]
    },

    {
        userId: 3,
        username: "amy2000",
        password: "amy",
        dateOfBirth: "1998-01-01",
        gender: "female",
        address1: "1 Bloor St E, Toronto, ON M4W 0A8",
        address2: "Bahen Center, 121 St George St.",
        phone: "123-456-7890",
        email: "amy2000@user.com",
        preference: "Nothing really",
        bio: "Looking for coding books",
        Wishlisted: [],
        Donated: [3],
        transaction: [2, 4]
    },

    {
        userId: 4,
        username: "andy2000",
        password: "andy",
        dateOfBirth: "1998-01-01",
        gender: "male",
        address1: "1 Bloor St E, Toronto, ON M4W 0A8",
        address2: "Bahen Center, 121 St George St.",
        phone: "123-456-7890",
        email: "andy2000@user.com",
        preference: "furniture hunter",
        bio: "Fun guy",
        Wishlisted: [1, 2],
        Donated: [4],
        transaction: []
    }
]

export default {transactions, posts, users}
