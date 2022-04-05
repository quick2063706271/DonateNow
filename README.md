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
    <br/> - An ADMIN MODE sign appears on the top right corner to remind the admin of its current mode. 
    <br/> - Admin navigation menu contains buttons that can direct them to view BLOCK LIST and FEEDBACK.
    <br/> - After login, admin is directed to search page by default, they can use the Search Bar just like the regular users.
    <br/>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - When viewing a post, admin can access the donor/owner's the profile by clicking on the User Profile button at the top left of the post. 
    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Admin can then review the user's full profile information. 
    
    
2. Click on VIEW FEEDBACK to find a list of all feedbacks that users have submitted 
    <br/> - Admin can review the feedbacks submitted by regular users. 
    <br/> - Click on the User ID in each feedback to have a brief view of User Information. 
    <br/> - Admin can block this user by clicking on the corresponding button at the bottom of User Information page.  

3. Click on BLOCK LIST to find a list of all users 
    <br/> -  Click on each User ID under the Username column to have a brief view of basic user information. 
    <br/> -  Click on the BLOCK/UNBLOCK button under the Action column to block or unblock a specific user. 

    






