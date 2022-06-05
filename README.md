# React-Node-MongoApp
 Application for 3rd year web final assessment. 

[link to my ToDo Board](https://github.com/users/CarlHaze/projects/1/views/1)

 # *MERN basics*
 # **using MongoDB, Express, React, Node** 

Express for Routing 
MondgoDB to hold permanant data
React for frontend views
Node for backend managment

[Docker usage](https://www.docker.com/products/docker-desktop/)


**Assessment Aim**

To assess your ability to develop an advanced Web application using new or influential Web technologies.

**Format of the Deliverable**

Using an industry recognised Web application framework that you **did not use** for a previous assessment, create an application that includes the following functionality:

- Includes the use of a 3rd party web component technology, e.g. *Material UI, Polymer, Vuetify, Web Components* etc. to provide reusability and consistency with regards to common element groups. For example; *cards, grids, navbars, buttons*. **(10 marks)**

- Displays the Web site layout and components in a tidy and consistent format (lecturers discretion) (*grids, cards, toolbars*) etc. **(5 marks)**

- Utilises a database to provide and populate some components with data (see the lecturer for approval, before implementation). **(20 marks)**

- Should be viewable in extra small and medium sized mobile devices without sideways scrolling or having to zoom in to read content. (**5 marks)**

- Demonstrates the use of the browsers *LocalStorage* feature. **(10 marks)**

- Provide a secure backend area in your site (user credentials) to store and perform data manipulation. This can be managed by a local database MySQL, Mongo DB etc. or something like *Firebase* etc. **(35 marks)**

- Maintain your source code using an industry recognised version control system e.g. *Git, Bitbucket* etc. **(15 marks)**


 # MongoDB 

# MongoDB cluster connection info
    Username: Carl_Ellis
    Password: mongodbtest

# MongoDB Connect your application info
    mongodb+srv://Carl_Ellis:mongodbtest@cluster0.j16jrhy.mongodb.net/?retryWrites=true&w=majority



# Notes

## nodemon
Installed nodemon to monitor changes within our application while it is running
to use this need to add this line to our scripts in package.json
     "ourserver": "nodemon server.js",


## Template engine
Adding template engine EJS
    npm install ejs
need to tell our app we want to use EJS doing this top of our server.js file