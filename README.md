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
1. Log in to the webpage using the following configuration: 
    ```
    Username: user@user.com
    Password: user
    ```
    <br/> - User will be directed automatically to the Search Result Page for browsing and requesting items. 

2. Click on MY PROFILE on the top right corner to review the user profile 
    <br/> - If not logged in, message will prompt user to log in before proceeding.
    <br/> - User can access different functionalities by clicking on different tabs in the left panel. 
    <br/> - In the User Information tab, the user can click on Edit button to edit his/her user profile and Save button to update any changes. 
    <br/> - In the Transaction History tab, the user can view a list of completed donated that the user received from donnees. 
    <br/> - In the Donated History tab, the user can view a list of his donated items. 
    <br/> - In the Submit Feedback tab, the user can file a complaint or submit a response to be reviewed by the admin. 
    

3. Click on WISH LIST on the top right corner to review a list of all items the user have wishlisted 
    <br/> - If not logged in, message will prompt user to log in before proceed.
    <br/> - User can click on the header of each post in WISH LIST to review the post in detail. 
    <br/> <br/> - If the user has completed the transaction of the item, a status bar Viewer Status: Completed will appear at the top of the post. 
    <br/> <br/> - If the transaction is yet to complete, a Request Now button will appear at the top of the post to remind the user. If clicked, a pop up window will appear, asking the user to confirm or cancel his request. 
    
4. Click on DONATE NOW on the top right corner to post a new donation 
    <br/> - User must fill in all required areas to publish posts.
    <br/> - Click on PUBLISH to submit post form, error message will prompt if not all areas are filled.
    <br/> - If successfully published, users will be automatically directed to post page.

5. Click on the SEARCH button on the top center to obtain a list of all posts chronologically
    <br/> - User can enter keywords in the search bar to search for results that contain the input. 
    <br/> - User can filter the search results by selecting from the list of dropdowns. 

6. Click on a post in the search/wishlist result to review the post in detail.
    <br/> - Click on LOGIN TO SEE MORE if the user not logged in.
    <br/> - Status will be shown on the top right corner depends on owner/viewer, besides some buttons they can click to change status.
    <br/> - Click on ADD TO WISHLIST to add this item to the user's wishlist. 
    <br/> - Click on REQUEST NOW to be directed to a dialogue for requesting the item. 
    <br/> - Click on CHOOSE DONEE to be directed to a dialogue for donor to choose donee >
    <br/> - Click on COMPLETED or FAILED to a page for indicate transaction result>

7. Click on FAQ in the bottom footbar to find a list of all frequently asked questions.
 
8. Click on the TERMS AND CONDITIONS to review the terms and conditions for this website. 

9. Click on the DONATENOW.COM at the top left corner to be redirected back to the home page. 


### Userflow for admins 
1. Log in to the webpage using the following configuration: 
    ```
    Username: admin@admin.com
    Password: admin
    ```
    - An ADMIN MODE sign appears on the top right corner to remind the admin of its current mode. 
    - Admin navigation menu contains buttons direct them to view blocklists and feedback.
    - After login, admin is directed to search page by default, they can search like regular users.
    
2. Click on VIEW FEEDBACK to find a list of all feedbacks that users have submitted 
    <br/> - Admin can review the feedbacks reular users submit under the SUBMIT FEEDBACK panel in their user profile. 
    <br/> - Click on the User ID in each feedback to have a brief view of basic user information. 
    <br/> - 

3. Click on BLOCK LIST to find a list of all users 
    <br/> -  Click on each User ID under the Username column to have a brief view of basic user information. 
    <br/> -  Click on the BLOCK/UNBLOCK button under the Action column to block or unblock certain users. 

    






