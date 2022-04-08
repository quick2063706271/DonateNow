# DONATENOW.COM :heart:

## Notes about changes after submission deadline
We made some changes to server/server.js session part to resolve deployment issue on Heroku (specifically line 136). Thanks for your understanding.

## Website 
Heroku URL: https://donate-now-team02.herokuapp.com/   
&nbsp;

## Run Our App Locally After Cloning Repo 
### Set Up 
```
# install server dependencies in the root directory
cd server 
npm install

# go back to the root directory
cd ..

# install frontend dependencies in the client directory
cd client
npm install
```

### Development 
```
# build the React app
cd client
npm run build

# go back to the root directory
cd ..

# run the server
cd server 
node server.js
```

### View from Browser 
Proceed to http://localhost:6001 in the browser and login with the user credentials.   
&nbsp; 

### Deploy with Docker
```
docker build -t donate-now .
docker run -d --rm -p 5000:5000 donate-now
```

### View Website Database  
#### Connect using Compass 
```
mongodb+srv://donatenow:mydonatenow@cluster0.rdum2.mongodb.net/DonateNowAPI
```

#### Connect using Node.js 
```
"mongodb+srv://donatenow:mydonatenow@cluster0.rdum2.mongodb.net/DonateNowAPI?retryWrites=true&w=majority"
```
&nbsp; 


## Third Party Libraries Used 
The only third party library our team used is the Material-UI. 
<br/>Website URL: https://v4.mui.com/     
&nbsp;   


## Overview of Routes 

### 1. Routes for Account and Session Information 

#### User Login and Create a Session (POST) 
Request URL: http://localhost:6001/login
<br/>This is used for verifying a user's credentials (emails and password) when logging into the website. This also add the user ID into the session for the user to remain logged in. 
<br/>This route is expected to be sent a json file of email and password: 
```
{
    "email": "user@user.com",
    "password": "user" 
}
```
This route is expected to find the user and start the session if the user is valid, and throw an error message if the user is invalid. 


#### User Logout (GET) 
Request URL: http://localhost:6001/logout 
<br/>This is used for user logging out from the website. 
<br/>This route is expected to destroy and end the session that the user is currently in, thus log the user out from the website. 

#### Check If User is Logged in during a Session (GET) 
Request URL: http://localhost:6001/check-session
<br/>This is used for checking if a user is logged in the session and what user type that the user belongs to. 
<br/>This route is expteced to find the current session and return the information of the user, which includes the User ID and whether the user is admin: 
```
{
    "_id": {
        "$oid": "624514c210743452ec70abf2"
    },
    "admin": false 
}
```

#### Create Account (POST) 
Request URL: http://localhost:6001/api/createanaccount 
<br/>This is used for creating a new user account from receiving a user's credentials. 
<br/>This route is expected to be sent a json file of email and password: 
```
{
    "email": "new-user@user.com",
    "password": "user" 
}
```
This route is expected to add the newly created user into the user database for future logins.    

&nbsp;

### 2. Routes for Users 
#### Get Userpage (GET) 
Request URL: http://localhost:6001/api/userpage 
<br/>This is used for getting the current user's information from the session this user is currently in. 
<br/>This route is expected to return a json file of user's information, which will be displayed on the user's User Information panel under My Profile Page. 

#### Update Userpage (PATCH) 
Request URL: http://localhost:6001/api/userpage 
<br/>This is used for updating a user's information when the user edit his profile information on the User Information panel under My Profile page. 
<br/>This route is expected to be sent a json file of the new version of user's information and to change the User database accordingly. 

#### Post Feedback (POST) 
Request URL: http://localhost:6001/api/userpage
<br/>This is used for saving a user's feedback after he submit it through the Submite Feedback page. 
<br/>This route is expected to be sent a json file containing the feedback information, which will be displayed on the admin's View Feedback page. 
```
{
    "title": "HELP! My request was cancelled for no reason",
    "content": "I noticed my request for a used computer was cancelled suddenly but I was having a successful transaction. I wonder how this occurred?",
}
```

#### Get Donated History Posts (GET) 
Request URL: http://localhost:6001/api/userpage/donatedHistory
<br/>This is used for getting all the donated history of the current user. 
<br/>This route is expected to return a json file containing the user/donor's past history of donation, which will be displayed on the user's Donated History panel under My Profile page. 

#### Get Transaction History Posts (GET) 
Request URL: http://localhost:6001/api/userpage/transactedHistory
<br/>This is used for getting all the transacted history of the current user. 
<br/>This route is expected to return a json file containing the user/donee's past history of transaction, which will be displayed on the user's Transaction History panel under My Profile page.    


&nbsp;   
### 3. Routes for Posts 
#### Create Post (POST) 
Request URL: http://localhost:6001/api/posts 
<br/>This route is for an user to create and publish a post after filling in all required fields of information on the DONATE NOW page. 
<br/>This route is expected to be sent a json file containing the new post's information when the user publishes the post, and store it in the Posts database: 
```
{  
   "ownerId":{"$oid":"624732f033cf034ce21c1989"},
   "ownerStatus":"Posted",
   "viewers":[],
   "imageSrc":{"$oid":"624be253e3ad663b8dddbb6e"},
   "deliveryOption":"Pickup",
   "header":"Toys for Kids 5-6 Year Olds",
   "location":"Toronto, ON",
   "description":"I bought the toys 2 years ago for my son, almost as new. He has new toys now and we wish to give away to kids who may like it. Please request only if you can pick it up in Toronto DT, thanks.",
   "categories":["\"Toys, Kids, Parents\""]
}
```
This route is expected to add the newly created post into the post database.

#### Incrementing Post Views (PATCH) 
Request URL: http://localhost:6001/api/post/views/:id
<br/>This route helps keep track of number of views of one post from the its Post ID. 
<br/>This route is expected to find the post from its Post ID in the Post database, and increment the view count by 1. The view count is displayed as an attribute on the Serch Result page and the Post Page. 

#### Change Owner Status (PATCH) 
Request URL: http://localhost:6001/api/post/:id
<br/>This route changes the owner status of a post. 
<br/>This route is expected to find a post from its Post ID in the Post database, and to update the ownerStatus attribute of this post. This change is reflected on the Post Page of this post. 

#### Add Viewer Status (POST) 
Request URL: http://localhost:6001/api/post/:id/:viewer_id   
<br/>This route adds the viewer status of a post. 
<br/>This route is expected to find a post from its Post ID in the Post database, and to add the viewerStatus of the user as an attribute to be displayed on the Post Page of this post. 

#### Change Viewer Status (PATCH) 
Request URL: http://localhost:6001/api/post/:id/:viewer_id
<br/>This route changes the viewer status of a post. 
<br/>This route is expected to find a post from its Post ID in the Post database, and to update the viewerStatus attribute of this post. This change is reflected on the Post Page of this post.    

&nbsp;
### 4. Routes for Wishlist 

#### Get a User's Wishlist from User ID (GET) 
Request URL: http://localhost:6001/api/posts/:id 
<br/>This route browses through all posts and extract all items/posts wishlisted by a certain user from his User ID. 
<br/>This route is expected to authenticate user, then return a json file of wishlist information. 

#### Get Post Wishlist Count (GET)  
Request URL: http://localhost:6001/api/post/wishlist/:id 
<br/>This route counts the number of times a post is wishlisted by users. 
<br/>This route is expected to browse through all users and count the number of times a Post ID appears in user's wishlists. It then returns this number to be displayed on the post's Post Page as the Saved property. 

#### Add to Wishlist (PATCH) 
Request URL: http://localhost:6001/api/post/wishlist/:uid/:pid
<br/>This route performs a user's action of adding a post into his Wishlist. 
<br/>This route is expected to find the target post from the Post ID and the current user from the User ID. It then pushes the post into the user's wishlisted items. This changed is reflected through the Wish List page of the user. 


#### Remove from Wishlist (PATCH) 
Request URL: http://localhost:6001/api/post/unwishlist/:uid/:pid
<br/>This route performs a user's action of removing a post from his Wishlist. 
<br/>This route is expected to find the target post from the Post ID and the current user from the User ID. It then removes the post from the user's wishlisted items. This changed is reflected through the Wish List page of the user.    
&nbsp;

### 5. Route for Search Page 
#### Get and Filter Posts for Search Page (GET) 
Request URL: http://localhost:6001/api/filterposts
<br/>This routes performs the function of the Search Bar. 
<br/>This route is expected to get all posts from the Posts database. It displays the posts after filtering the posts with the input keyword and the selected filters from the drop down list on the Search Page.       

&nbsp;

### 6. Route for Post Page 
#### Get Post from Post ID (GET) 
Request URL: http://localhost:6001/api/post/:id
<br/>This route gets a post's information from the Post ID in the Posts database. 
<br/>This route is expected to  return a json file of post information to be processed and displayed on the View Post page: 
```
{
    "ownerId": {
        "$oid": "6247351a33cf034ce21c19a6"
    },
    "ownerStatus": "Posted",
    "viewers": [{
        "viewerId": {
            "$oid": "624732f033cf034ce21c1989"
        },
        "viewerStatus": "Requested"
        }, {
        "viewerId": {
            "$oid": "6247346533cf034ce21c1999"
        },
        "viewerStatus": "Requested"
    }],
    "imageSrc": {
        "$oid": "624be231e3ad663b8dddbb68"
    },
    "deliveryOption": "By Courier",
    "header": "Clothes for Kids 5-6 Year Olds",
    "location": "Toronto, ON",
    "description": "My son grows really fast, these clothes are almost new. We wish to give away to kids who may need it.",
    "categories": ["Clothing", "Toys, Kids, Parents"],
    "views": 34,
    "datePosted": "4/1/2022 08:23",
}
```    
&nbsp;

### 7. Routes for Image Uploader 
#### Create an Image onto Posts (POST) 
Request URL: http://localhost:6001/images/post
<br/>This route addes the new image into the database after it is uploaded by a user while creating a new post. 
```
{
    "image_id": "p839abuv9636hhq3orpg",
    "image_url": "http://res.cloudinary.com/dvskgtzrl/image/upload/v1649140226/p839abuv9636hhq3orpg.png",
}
```

#### Create an Image by User ID (POST) 
Request URL: http://localhost:6001/images/user/:uid
<br/>This route addes the new image into the database after it is uploaded by a user while uploading his profile picture. 
```
{
    "userId": {
        "$oid": "6247346533cf034ce21c1999"
    },
    "image_id": "ajelgv54jl0nbhbqo0ey",
    "image_url": "http://res.cloudinary.com/dvskgtzrl/image/upload/v1649193457/ajelgv54jl0nbhbqo0ey.jpg",
}
```

#### Get an Image by Image ID (GET)
Request URL: http://localhost:6001/images/post/:id
<br/>This route finds and returns an image identified by its Image ID from the database. 


#### Remove an Image by Image ID (DELETE)
Request URL: http://localhost:6001/images/:imageId
<br/>This route browses through all images and deletes an image identified by its Image ID from the database.   

&nbsp;


### 8. Route for Admin Feedback Page 
#### Get All Feedbacks (GET) 
Request URL: http://localhost:6001/api/admin/feedback 
<br/>This route extracts all the user feedbacks from the Feedback database. 
<br/>This route is expected to authenticate user and verify the user is admin, then return a json file of feedback information to be displayed on the View Feedback page: 
```
{
    "title": "HELP! My request was cancelled for no reason",
    "content": "I noticed my request for a used computer was cancelled suddenly but I was having a successful transaction. I wonder how this occurred?",
    "isResolved": false,
}
``` 

&nbsp;

### 9. Routes for Admin Blocklist Page 
#### Get All Blocklist (GET)
Request URL: http://localhost:6001/api/admin/blocklist
<br/>This route extracts all the user information from the User database. 
<br/>This route is expected to authenticate user and verify the user is admin, then return a json file of user information. The accountBlocked attribute for each user is extracted from each user to be displayed on the Block List page. 

#### Update Blocklist from User ID (PATCH) 
Request URL: http://localhost:6001/api/admin/blocklist 
<br/>This route identifies a user from the User ID, and block or unblock his account. 
<br/>This route is expected to authenticate user and verify the current user is admin, then extracts a specific user's information from the input User ID and changes this user's accountBlocked status.    
&nbsp; 

### 10. Route for Terms and Conditions Page
#### Get All Terms and Conditions (GET)
Request URL: http://localhost:6001/api/termsconditions
<br/>This route extracts all the terms and conditions from the database. 
<br/>This route is expected to return a json file of terms and conditions information to be displayed on the Terms and Conditions page: 
```
{
    "header": "Content",
    "description": "Our Service allows You to post Content. You are responsible for the Content that You post to the Service, including its legality, reliability, and appropriateness."
}
``` 

&nbsp;

### 11. Route for FAQ Page 
#### Get All FAQs (GET) 
Request URL: http://localhost:6001/api/faqpage
<br/>This route extracts all the faqs from the database.
<br/>This route is expected to return a json file of FAQ information to be displayed on the FAQ page: 
```
{
    "question": "How can I update my personal information?",
    "answer": "You can access your personal information through clicking into My Profile on the top right corner of the page. You can then update the information by clicking the Edit button at the bottom of the page. Please remember to click Save after you are done.  "
}
```
&nbsp;


## Project Navigation Outline 

### Userflow for regular users 
1. Log in to the webpage using the following configuration. User will be directed automatically to the Search Result Page for browsing and requesting items. 
    ```
    Username: user@user.com
    Password: user
    ``` 
    
    
2. Click on the SEARCH button on the top center to obtain a list of all posts chronologically
    <br/> - User can enter keywords in the search bar to search for results that contain the input. 
    <br/> - To narrow down his/her search range, the user can filter the search results by selecting from the list of dropdowns. 


3. Click on a post header or picture in the search/wishlist result to review the post in detail
    <br/> - Click on LOGIN TO SEE MORE if the user not logged in.
    <br/> - Status will be shown on the top right corner, and changes when viewed by different users. 
    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - No status will be shown if the item is neither posted or requested by the user. 
    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - A status of Owner Status: Posted will be shown if the item is posted by the user and the transaction yet to be completed. 
    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - A status of Owner Status: Completed will be shown if the item is posted by the user and transaction already completed. 
    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - A status of Viewer Status: Requested will be shown if the item is requested by the user and the transaction yet to be completed. 
    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - A status of Viewer Status: Completed will be shown if the item is requested by the user and transaction already completed. 
    
    
4. While viewing a post, user can perform certain actions to change his/her status 
    <br/> - If item is not wishlisted, click on ADD TO WISHLIST to add this item to the user's wishlist. 
    <br/> - If the user want to request this item, click on REQUEST NOW to be directed to a dialogue for requesting the item. 
    <br/> - If the current user is the donor of the item and another user has sent a request, click on CHOOSE DONEE to be directed to a dialogue to choose one donee to receiving this item. 
    <br/> - If the user has submitted a request and has received a response from the donor, click on COMPLETED or FAILED to be directed to a page for reviewing the transaction result. 


4. Click on MY PROFILE on the top right corner to review the user profile 
    <br/> - If not logged in, a message will prompt user to log in before proceeding.
    <br/> - User can access different functionalities by clicking on different tabs in the left panel. 
    <br/> - In the USER INFORMATION tab, the user can click on Edit button to edit his/her user profile and Save button to update any changes. 
    <br/> - In the TRANSACTION HISTORY tab, the user can view a list of completed donated that the user received from donnees. 
    <br/> - In the DONATED HISTORY tab, the user can view a list of his donated items. 
    <br/> - In the SUBMITE FEEDBACK tab, the user can file a complaint or submit a response to be reviewed by the admin. 


5. Click on WISH LIST on the top right corner to review a list of all items the user have wishlisted 
    <br/> - If not logged in, message will prompt user to log in before proceed.
    <br/> - User can click on the header or picture of each post in WISH LIST to review the post in detail. 
    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - If the user has completed the transaction of the item, a status Viewer Status: Completed will appear at the top of the post. 
    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - If the transaction is yet to complete, a Request Now button will appear at the top of the post to remind the user. If clicked, a pop up window will appear, asking the user to confirm or cancel his request. 

    
6. Click on DONATE NOW on the top right corner to post a new donation 
    <br/> - User must fill in all required areas to publish posts.
    <br/> - Click on PUBLISH to submit post form, error message will prompt if not all areas are filled.
    <br/> - If successfully published, users will be automatically directed to the post page of this new donation. A status bar Owner Status: Posted will appear at the top of the post. 


7. Click on FAQ in the bottom footbar to find a list of all frequently asked questions.
    <br/>

8. Click on the TERMS AND CONDITIONS to review the terms and conditions for this website. 
    <br/>

9. Click on the DONATENOW.COM at the top left corner to be redirected back to the home page.    
    <br/>
&nbsp;  

### Userflow for admins 
1. Log in to the webpage using the following configuration: 
    ```
    Username: admin@admin.com
    Password: admin
    ```
    
2. An ADMIN MODE sign appears on the top right corner to remind the admin of its current mode. 
    <br/> - Admin navigation menu contains buttons that can direct them to view BLOCK LIST and FEEDBACK.
    <br/> - After login, admin is directed to search page by default, they can use the Search Bar just like the regular users.
    <br/>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - When viewing a post, admin can access the donor/owner's profile by clicking on the User Profile button at the top left of the post. 
    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Admin can then review the user's full profile information. 
    
    
3. Click on VIEW FEEDBACK to find a list of all feedbacks that users have submitted 
    <br/> - Admin can review the feedbacks submitted by regular users. 
    <br/> - Click on the User ID in each feedback to have a brief view of User Information. 
    <br/> - Admin can block this user by clicking on the corresponding button at the bottom of User Information page.  

4. Click on BLOCK LIST to find a list of all users 
    <br/> -  Click on each User ID under the Username column to have a brief view of basic user information. 
    <br/> -  Click on the BLOCK/UNBLOCK button under the Action column to block or unblock a specific user.    
&nbsp;      
&nbsp; 



## Mapping of Post Status to Owner and Viewer Interactions 
The status on each post displays different information depending on the user viewing it and the state of the transaction. This section outlines how the status of a post changes in accordance to the interaction between doner and donee(s). 

<img src="README_Post_Status.png" alt="post_status" width="800"/>


### As an Owner/Doner of the Post 
As the owner of the post, the user might see four types of post status: "Posted", "Donation Matched", "Completed", or "Failed".    

#### "Owner Status: Posted"
This status appears after the user publishes this post of donation on the DONATE NOW page. 
If this post has been requested by one or more viewers, the user can clicking on CHOOSE YOUR DONEE on the post page to choose one user as the donee from the popup window. 

#### "Owner Status: Donation Matched"
This status appears after the user has chosen one user as the donee from a list of users who requested this post. The user has now become the donor of the chosen donee. The user can now view the chosen donee's personal information by clicking VIEW DONEE INFORMATION button. 
<br/>After the transaction, the user can also click on COMPLETED or FAILED button to mark this transaction as successful or unsuccessful. 

#### "Owner Status: Completed" 
This status appears if the user marks the transaction as completed by clicking the COMPLETED button on top the post page. Synchronously, the donee of the post will now see a status of "Viewer Status: Completed" when viewing this post. 

#### "Owner Status: Failed" 
This status appears if the user marks the transaction as failed by clicking the FAILED button on top the post page. Synchronously, the donee of the post will now see a status of "Viewer Status: Failed" when viewing this post. 

      
&nbsp;  
### As an Viewer/Donee of the Post 
As the viewer of the post, the user might see four types of post status: "Requested", "Request Accepted", "Completed", or "Failed".    

#### "Viewer Status: Requested"
This status appears after the user has requested the item on this post by clicking the REQUEST NOW button. The donor of the post will then have the option to accept or decline this user as the donee. 

#### "Viewer Status: Request Accepted"
This status appears if the user's request has been accepted by the donor. The user has now become the chosen donee of the donor. The user can now view the chosen donor's personal information by clicking VIEW DONOR INFORMATION button. 
<br/>After the transaction, the user can also click on COMPLETED or FAILED button to mark this transaction as successful or unsuccessful. 

#### "Viewer Status: Completed" 
This status appears if the user marks the transaction as completed by clicking the COMPLETED button on top the post page. Synchronously, the donor of the post will now see a status of "Owner Status: Completed" when viewing this post. 

#### "Viewer Status: Failed" 
This status appears if one of the following two cases occurs: 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - The user's request has been declined by the donor. 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - This status appears if the user marks the transaction as failed by clicking the FAILED button on top the post page. Synchronously, the donor of the post will now see a status of "Viewer Status: Failed" when viewing this post. 



