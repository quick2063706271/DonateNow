# DONATENOW.COM :heart:

## Basic Commands 

Build Front End
```
cd client
npm install
npm run build
```

Build Back End 
```
cd server 
node server.js
```

Serve with express
```
cd server
npm install
npm start
```

Deploy with Docker
```
docker build -t donate-now .
docker run -d --rm -p 5000:5000 donate-now
```


## Overview of Routes 

### 1. Routes for Account and Session Information 

#### User Login and Create a Session (POST) 
Request URL: http://localhost:6001/login
<br/>This is used for verifying a user's credentials (emails and password) when logging into the website. This also add the user ID into the session for the user to remain logged in. 
This route is expected to be sent a json file of email and password: 
```
{
    "email": "user@user.com",
    "password": "user" 
}
```
This route is expected to find the user and start the session if the user is valid, and throw an error message if the user is invalid. 


#### User Logout 

#### Check If User is Logged in during a Session 

#### Create Account (POST) 
Request URL: http://localhost:6001/api/createanaccount 
This is used for creating a new user account from receiving a user's credentials. 
This route is expected to be sent a json file of email and password: 
```
{
    "email": "new-user@user.com",
    "password": "user" 
}
```
This route is expected to add the newly created user into the user database for future logins. 

#### Create Post (POST) 
Request URL: http://localhost:6001/api/posts 
This route is for an user to create and publish a post after filling in all required fields of information. 
This route is expected to be sent a json file of post information: 
```
{  "ownerId":{"$oid":"624732f033cf034ce21c1989"},
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


### 2. Routes for Users 
#### Get Userpage 
#### User Page get other user (not sure) 
#### Update Userpage 
#### Post Feedback 
#### Get Donated History Posts 
#### Get Donated History Posts from Post ID 
#### Get Transaction History Posts

### 3. Route for Posts 
#### Creating Posts 
#### Incrementing Post Views 
#### Change Owner Status 
#### Change Viewer Status 
#### Add Viewer Status 

### 4. Routes for Wishlist 

#### Get a User's Wishlist from User ID (GET) 
Request URL: http://localhost:6001/api/posts/:id 
<br/>This route browses through all posts and extract all items/posts wishlisted by a certain user from his User ID. 
<br/>This route is expected to return a json file of wishlist information. 
```
to be implemented 
``` 

#### Get Post Wishlist Count (not sure) 
#### Add to Wishlist 
#### Remove from Wishlist 

### 5. Route for Search Page 
#### Get and Filter Posts 


### 6. Route for Post Page 
#### Get Post from Post ID 

### 7. Route for Admin Feedback Page 
#### Get All Feedbacks 

### 8. Route for Admin Blocklist Page 
#### Get All Blocklist 
#### Update Blocklist from User ID 

### 9. Route for Terms and Conditions Page
#### Get All Terms and Conditions 

### 10. Route for FAQ Page 
#### Get All FAQs 








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

    






