
// let ownerStatuses = ["posted", "donation matched", "completed", "failed"]

// let viewerStatuses = ["requested", "requst accepted", "completed", "failed"]

let categories = ["Toys, Kids, Parents", "Clothing", "Books & Stationary", "Art", "Furniture", "Shoes, Bags, Backpacks", "Music", "Sports","Electronics",  "All"]

let locations = ["Toronto, ON", "Montreal, QC", "All"]

let deliveryOptions = ["Pickup", "By Courier", "All"]

let sortDatePosted = ["Newest", "Oldest"]

let sortViews = ["Largest", "Smallest"]

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
        ownerStatus: "donation matched",
        viewerStatus: "failed",
    },

    {
        postId: 3,
        ownerId: 3,
        viewerId: 2,
        ownerStatus: "donation matched",
        viewerStatus: "request accepted"
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
        views: 65,
        requests: 0,
        saved: 26,
        datePosted: "3/19/2022"
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
        views: 50,
        requests: 20,
        saved: 32,
        datePosted: "3/2/2022"
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
        views: 45,
        requests: 20,
        saved: 32,
        datePosted: "3/15/2022"
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
        views: 75,
        requests: 20,
        saved: 32,
        datePosted: "3/4/2022"
    }
]

  let users = [
    {
        userId: 1, //624732f033cf034ce21c1989
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
        // donated: [1],
        // transaction: [2, 3, 4],
        complaintNum: [2],
        accountBlocked: false,
        admin: false
    },

    {
        userId: 2,  //6247346533cf034ce21c1999
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
        accountBlocked: false,
        admin: false
    },

    {
        userId: 3,//6247351a33cf034ce21c19a6
        username: "amy2000@user.com", 
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
        accountBlocked: true,
        admin: false
    },

    {
        userId: 4, //6247359733cf034ce21c19b0
        username: "andy2000@user.com",
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
        accountBlocked: false,
        admin: false
    },

    {
        userId: 5, //624744f25249a1ec8979c716
        username: "admin@admin.com",
        password: "admin",
        dateOfBirth: "2000-02-20",
        gender: "female",
        address1: "115 Eglinton Ave E, Toronto, ON M4P 1H4",
        address2: "1757 Victoria Park Ave, Scarborough, ON M1R 1S1",
        phone: "333-666-9999",
        email: "admin@admin.com",
        preference: "Pets, Books",
        bio: "I love pets. I have three parrots, two cats, and a dog.",
        wishlisted: [],
        donated: [],
        transaction: [],
        complaintNum: [],
        accountBlocked: false,
        admin: true
    }
]

let allfaqs = [
    {
        id: 1,
        question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer: " Pellentesque venenatis condimentum consectetur. Etiam et interdum urna. Suspendisse maximus egestas hendrerit."

    },

    {
        id: 2,
        question: "Fusce elementum lectus et magna vestibulum, at blandit nibh pellentesque? ", 
        answer: "In sapien massa, auctor auctor ultricies at, ultricies sed sem. Suspendisse a ex nulla. Fusce nec sagittis leo."
    },

    {
        id: 3,
        question: "Phasellus rhoncus laoreet dictum. Nullam consectetur justo ut lectus sodales? ", 
        answer: "A lacinia magna aliquet. Curabitur vel arcu eu sapien. "
    },

    {
        id: 4,
        question: "Sed eget condimentum ligula, sit amet accumsan purus?", 
        answer: "Morbi egestas arcu rutrum arcu mattis, nec iaculis sapien sodales."
    },

    {
        id: 5,
        question: "Vestibulum vehicula porta massa. Fusce vitae nibh a nunc tincidunt ullamcorper? ", 
        answer: "Sed nec magna placerat tortor pharetra gravida eu et ex."
    },

    {
        id: 6,
        question: "Vivamus et justo pellentesque, luctus mauris vel, venenatis felis? ", 
        answer: "In elit erat, auctor in fermentum sed, blandit eget nibh. Curabitur vel arcu eu sapien tempus pellentesque."
    }
]

let allterms = [
    {
        header: "User Accounts",
        description: "When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service."
    },

    {
        header: "Content",
        description: "Our Service allows You to post Content. You are responsible for the Content that You post to the Service, including its legality, reliability, and appropriateness."
    },

    {
        header: "Content Restrictions",
        description: "The Company is not responsible for the content of the Service's users. You expressly understand and agree that You are solely responsible for the Content and for all activity that occurs under your account, whether done so by You or any third person using Your account."
    },

    {
        header: "Content Backups",
        description: "Although regular backups of Content are performed, the Company does not guarantee there will be no loss or corruption of data."
    },

    {
        header: "Copyright Policy",
        description: "We respect the intellectual property rights of others. It is Our policy to respond to any claim that Content posted on the Service infringes a copyright or other intellectual property infringement of any person."
    },

    {
        header: "Termination",
        description: "We may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions."
    }
]


function changeStatus(transac, user, val){
    console.log(transac, user, val)
    for (let i = 0; i < transactions.length; i++) {
        if (transac.postId === transactions[i].postId
            && transac.ownerId === transactions[i].ownerId
            && transac.viewerId === transactions[i].viewerId){
                transactions[i][user+"Status"] = val
            }
      }
}

function createPost(userId, header, location, description, deliveryOption, categories){
    let newPostId = posts[posts.length - 1].postId + 1

    let newPost = {
        postId: newPostId,
        ownerId: userId,
        viewerIds: [],
        imageSrc: '/upload.png',
        deliveryOption: deliveryOption,
        header: header,
        location: location,
        description: description,
        categories: categories,
        views: 0,
        requests: 0,
        saved: 0,
        datePosted: "3/6/2022"
        // datePosted: new window.Date.now().toLocaleDateString()
    }
    posts.push(newPost)
    console.log(newPost)

    let newTransac={
        postId: newPostId,
        ownerId: userId,
        viewerId: -1, // -1 means no viewer
        ownerStatus: "posted",
        viewerStatus: ""
    }
    transactions.push(newTransac)

    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId){
                users[i].donated.push(newPostId);
            }
      }

    console.log(posts)
    console.log(transactions)
    console.log(users)
    return newPostId;

}

function getUserData(userId){
    for (let i = 0; i < users.length; i++) {
        if (users[i].userId === userId){
                return (users[i]);
            }
      }
}

function findDonees(postId){
    let doneeIds = []
    let doneesData = []
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].postId === postId){
            doneeIds = posts[i].viewerIds
        }
    }
    console.log(doneeIds)
    for (let j = 0; j < doneeIds.length; j++) {  
        doneesData.push(getUserData(doneeIds[j]))
    }
    console.log(doneesData)
    return doneesData
    
}
let feedbacks = [
    {
        feedbackId: 1,
        userId: 2,
        title: "HELP! My request was cancelled for no reason",
        content: "I noticed my request for a used computer was cancelled suddenly but I was having a successful transaction. I wonder how this occured? ",
        isResolved: false
    },

    {
        feedbackId: 2,
        userId: 3,
        title: "A user posted inappropriate content",
        content: "When I browsed through the homepage I found a post that contains offensive information, so I want to drag attention to this user.",
        isResolved: false
    },

    {
        feedbackId: 3,
        userId: 2,
        title: "My donor never sends out my requested toys",
        content: "I have submitted a request on Jan 10 through the post https://DonateNow.com/post25 and I was chosen as the donnee, but since then my donor never processed my request. ",
        isResolved: false
    },

    {
        feedbackId: 4,
        userId: 1,
        title: "My received tableware is completed broken",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis condimentum consectetur. Etiam et interdum urna. Suspendisse maximus egestas hendrerit.",
        isResolved: false
    }
]

export default {categories, locations, deliveryOptions, sortDatePosted, sortViews, transactions, posts, users, allfaqs, feedbacks, allterms, createPost, changeStatus,getUserData,findDonees};
