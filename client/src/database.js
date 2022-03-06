
// let ownerStatuses = ["posted", "donation matched", "completed", "failed"]

// let viewerStatuses = ["requested", "requst accepted", "completed", "failed"]

let categories = ["Toys", "Kids", "Parents", "Interests", "Electronics", "Clothing", "Books & Stationary", "All"]

let locations = ["Toronto, ON", "Montreal, QC", "All"]

let deliveryOptions = ["Pickup", "By Courier", "All"]

let transactions = [
    {
        //case 1: posted
        postId: 1,
        ownerId: 1,
        viewerId: -1, // -1 means no viewer
        ownerStatus: "posted",
        viewerStatus: ""
    },

    {   //case 2: posted, some viewers requested
        postId: 2,
        ownerId: 2,
        viewerId: 1,
        ownerStatus: "posted",
        viewerStatus: "requested"
    },

    {
        postId: 2,
        ownerId: 2,
        viewerId: 3,
        ownerStatus: "posted",
        viewerStatus: "requested"
    },

    {   //case 3: donor has chosen 1 donnee
        postId: 3,
        ownerId: 3,
        viewerId: 1,
        ownerStatus: {3: "donation matched"},
        viewerStatuses: "failed",
    },

    {
        postId: 3,
        ownerId: 3,
        viewerId: 2,
        ownerStatus: "donation matched",
        viewerStatus: "requst accepted"
    },

    {   //case 4: posted, some viewers requested
        postId: 4,
        ownerId: 4,
        viewerId: 1,
        ownerStatus: "completed",
        viewerStatus: "failed"
    },

    {
        postId: 4,
        ownerId: 4,
        viewerId: 2,
        ownerStatus: "completed",
        viewerStatus: "completed"
    },

    {
        postId: 4,
        ownerId: 4,
        viewerId: 3,
        ownerStatus: "completed",
        viewerStatus: "failed"
    }
]

let posts = [

    {
        postId: 1,
        ownerId: 1,
        viewerIds: [],
        imageSrc: "/toys.png",
        deliveryOption: "Pickup",
        header: "Toys for Kids 5-6 Year Olds",
        location: "Toronto, ON",
        description: "I bought the toys 2 years ago for my son, almost as new. He has new toys now and we wish to give away to kids who may like it. " +
        "Please request only if you can pick it up in Toronto DT, thanks.",
        // categories: {"clothing": 0, "Toys, Kids, Parents": 1, "Art": 0, "Furniture": 0, "Books & Stationary": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        categories: ["Toys", "Kids", "Parents", "Interests"],
        blocked: 0,
        views: 50,
        requests: 0,
        saved: 26,
        datePosted: "Mar 1, 2022"
    },

    {
        postId: 2,
        ownerId: 2,
        viewerIds: [1, 3],
        imageSrc: '/monitor.png',
        deliveryOption: "By Courier",
        header: "Monitor from Microhard",
        location: "Toronto, ON",
        description: "I bought the monitor 2 years ago for my son, almost as new. He has new monitor now and we wish to give away to kids who may like it. ",
        // categories: {"clothing": 0, "Toys, Kids, Parents": 0, "Art": 0, "Furniture": 0, "Books & Stationary": 1, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        categories: ["Electronics"],
        views: 65,
        requests: 20,
        saved: 32,
        datePosted: "Mar 2, 2022"
    },

    {
        postId: 3,
        ownerId: 3,
        viewerIds: [1, 2],
        imageSrc: '/clothes.png',
        deliveryOption: "By Courier",
        header: "Clothes for Kids 5-6 Year Olds",
        location: "Toronto, ON",
        description: "My son grows really fast, these clothes are almost new. We wish to give away to kids who may need it. ",
        // categories: {"clothing": 1, "Toys, Kids, Parents": 1, "Art": 0, "Furniture": 0, "Books & Stationary": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        categories: ["Clothing", "Toys", "Kids", "Parents"],
        // category: "Clothing",
        views: 65,
        requests: 20,
        saved: 32,
        datePosted: "Mar 3, 2022"
    },

    {
        postId: 4,
        ownerId: 4,
        viewerIds: [1, 2, 3],
        imageSrc: '/marker.png',
        deliveryOption: "Pickup",
        header: "Marker",
        location: "Montreal, QC",
        description: "Some spare markers. Please pick it up",
        // categories: {"clothing": 0, "Toys, Kids, Parents": 0, "Art": 0, "Furniture": 0, "Books & Stationary": 1, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        // categories: ["Books & Stationary"],
        categories: ["Books & Stationary"],
        views: 65,
        requests: 20,
        saved: 32,
        datePosted: "Mar 4, 2022"
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
        wishlisted: [2,4],
        donated: [1],
        transaction: [2, 3, 4],
        complaintNum: [2],
        accountBlocked: false
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
        wishlisted: [1, 3, 4],
        donated: [2],
        transaction: [3, 4],
        complaintNum: [],
        accountBlocked: false
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
        wishlisted: [],
        donated: [3],
        transaction: [2, 4],
        complaintNum: [3],
        accountBlocked: true
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
        wishlisted: [1, 2],
        donated: [4],
        transaction: [],
        complaintNum: [1],
        accountBlocked: false
    }
]

let allfaqs = [
    {
        id: 1,
        content: "Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit? A: Pellentesque venenatis condimentum consectetur. Etiam et interdum urna. Suspendisse maximus egestas hendrerit."
    },

    {
        id: 2,
        content: "Q: Fusce elementum lectus et magna vestibulum, at blandit nibh pellentesque? A: In sapien massa, auctor auctor ultricies at, ultricies sed sem. Suspendisse a ex nulla. Fusce nec sagittis leo."
    },

    {
        id: 3,
        content: "Q: Phasellus rhoncus laoreet dictum. Nullam consectetur justo ut lectus sodales? A: a lacinia magna aliquet. "
    },

    {
        id: 4,
        content: "Q: Sed eget condimentum ligula, sit amet accumsan purus? A: Morbi egestas arcu rutrum arcu mattis, nec iaculis sapien sodales."
    },

    {
        id: 5,
        content: "Q: Vestibulum vehicula porta massa. Fusce vitae nibh a nunc tincidunt ullamcorper? A: Sed nec magna placerat tortor pharetra gravida eu et ex."
    },

    {
        id: 6,
        content: "Q: Vivamus et justo pellentesque, luctus mauris vel, venenatis felis? A:In elit erat, auctor in fermentum sed, blandit eget nibh. Curabitur vel arcu eu sapien tempus pellentesque. "
    }
]

let allterms = [
    {
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis condimentum consectetur. Etiam et interdum urna. Suspendisse maximus egestas hendrerit."
    },

    {
        id: 2,
        content: "Fusce elementum lectus et magna vestibulum, at blandit nibh pellentesque.  In sapien massa, auctor auctor ultricies at, ultricies sed sem. Suspendisse a ex nulla. Fusce nec sagittis leo."
    },

    {
        id: 3,
        content: "Phasellus rhoncus laoreet dictum. Nullam consectetur justo ut lectus sodales, a lacinia magna aliquet. "
    },

    {
        id: 4,
        content: "Sed eget condimentum ligula, sit amet accumsan purus. Morbi egestas arcu rutrum arcu mattis, nec iaculis sapien sodales."
    },

    {
        id: 5,
        content: "Vestibulum vehicula porta massa. Fusce vitae nibh a nunc tincidunt ullamcorper. Sed nec magna placerat tortor pharetra gravida eu et ex."
    },

    {
        id: 6,
        content: "Vivamus et justo pellentesque, luctus mauris vel, venenatis felis. In elit erat, auctor in fermentum sed, blandit eget nibh. Curabitur vel arcu eu sapien tempus pellentesque. "
    }
]

export default {categories, locations, deliveryOptions, transactions, posts, users, allfaqs, allterms};
