# team02

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
1. Log in to the webpage using any of the configuration: 
```
Username: amy2000
Password: amy
```

2. Click on MY PROFILE on the top right corner to review user profile 
By clicking on different tabs in the left panel, the user can edit personal information, review history, or to submit feedback for review. 
3. Click on WISH LIST on the top right corner to review all items the user have wishlisted 
User can click on each post in WISH LIST to review the post in detail 
4. Click on DONATE NOW on the top right corner to post a new donation 
A partial-completed post creation will not be published successfully. 
5. Click on the SEARCH button on the top center to obtain a list of all posts 
User can enter keywords in the search bar to search for results that contain the input. 
6. 


### Userflow for admins 
1. Log in to the webpage using the configuration: 
```
Username: admin@admin.com
Password: admin
```
2. 






