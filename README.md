# DONATENOW.COM :heart:

## Basic Commands 

Build Front End
```
cd client
npm install
npm run build
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
    Username: andyy2000
    Password: andy
    ```

2. Click on MY PROFILE on the top right corner to review user profile 
    <br/> - By clicking on different tabs in the left panel, the user can edit personal information, review history, or to submit feedback for review. 

3. Click on WISH LIST on the top right corner to review all items the user have wishlisted 
    <br/> - User can click on each post in WISH LIST to review the post in detail. 

4. Click on DONATE NOW on the top right corner to post a new donation 
    <br/> - A partial-completed post creation will not be published successfully. 

5. Click on the SEARCH button on the top center to obtain a list of all posts 
    <br/> - User can enter keywords in the search bar to search for results that contain the input. 
    <br/> - User can filter the search results by selecting from the list of dropdowns. 

6. Click on a post in the search result to review the post in detail.
    <br/> - Status will be shown on the top right corner if the item is already wishlisted or transaction has been done. 
    <br/> - Click on ADD TO WISHLIST to add this item to the user's wishlist. 
    <br/> - Click on REQUEST NOW to be directed to a page for requesting the item. 

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
    
2. Click on VIEW FEEDBACK to find a list of all feedbacks that users have submitted 
    <br/> - Users can submit feedback for review under the SUBMIT FEEDBACK panel in their user profile. 
    <br/> - Click on the User ID in each feedback to have a brief view of basic user information. 

3. Click on BLOCK LIST to find a list of all users 
    <br/> -  Click on each User ID under the Username column to have a brief view of basic user information. 
    <br/> -  Click on the BLOCK/UNBLOCK button under the Action column to block or unblock certain users. 
    






