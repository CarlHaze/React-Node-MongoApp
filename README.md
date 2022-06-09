# React-Node-MongoApp
 Application for 3rd year web final assessment. 

[link to my ToDo Board](https://github.com/users/CarlHaze/projects/1/views/1)

 # *MERN basics*
 # **using MongoDB, Express, React, Node** 

Express for Routing 
MondgoDB to hold permanant data
React for frontend views
Node for backend managment

run to start application
    npm run dev




**Assessment Aim**

To assess your ability to develop an advanced Web application using new or influential Web technologies.

**Format of the Deliverable**

Using an industry recognised Web application framework that you **did not use** for a previous assessment, create an application that includes the following functionality:

- Includes the use of a 3rd party web component technology, e.g. *Material UI, Polymer, Vuetify, Web Components* etc. to provide reusability and consistency with regards to common element groups. For example; *cards, grids, navbars, buttons*. **(10 marks)** 

*use somthing reconsied framework for my cards *Material UI is for react use this* so not carl.js 
  
- Displays the Web site layout and components in a tidy and consistent format (lecturers discretion) (*grids, cards, toolbars*) etc. **(5 marks)**

- Utilises a database to provide and populate some components with data (see the lecturer for approval, before implementation). **(20 marks)**

- Should be viewable in extra small and medium sized mobile devices without sideways scrolling or having to zoom in to read content. (**5 marks)**

- Demonstrates the use of the browsers *LocalStorage* feature. **(10 marks)**

- Provide a secure backend area in your site (user credentials) to store and perform data manipulation. This can be managed by a local database MySQL, Mongo DB etc. or something like *Firebase* etc. **(35 marks)**

- Maintain your source code using an industry recognised version control system e.g. *Git, Bitbucket* etc. **(15 marks)**


 # MongoDB 

# MongoDB cluster connection info
    Username: {username}
    Password: {password}

# MongoDB Connect your application info
    mongodb+srv://{username}:{password}@cluster0.j16jrhy.mongodb.net/?retryWrites=true&w=majority



# Notes

## nodemon
Installed nodemon to monitor changes within our application while it is running
to use this need to add this line to our scripts in package.json

     "ourserver": "nodemon server.js",


## Template engine
Adding template engine EJS

    npm install ejs

need to tell our app we want to use EJS doing this top of our server.js file
    
    app.set("view engine", "ejs")

then set the folder we want to keep our view templates in
    
    app.set("views", "./views")

## Client Side JavaScript
this is for clicking on entity so that we can edit values of them from the website

## Running multiple commands in parallel
npm-run-all package allows us to use this command that allows use to run multiple commands in parallel at once

    "dev":"run-p"
    "dev":"run-p ourserver ourwebpack"
    "ourwebpack": "webpack --watch"
    "ourserver": "nodemon server.js",

## React Install info  
*remember to set language mode to Javascript React*

React is a front end libary that lets us break down our code into componenets  

Installed a bunch of packages to help with conversions and utalisation of react 

     npm install react react-dom @babel/core @babel/preset-react babel-loader webpack webpack-cli webpack-node-externals npm-run-all

webpack is the important part here it will bundle up the JSX convert it into regular JavaScript that web browser will understand
need to create a file in the root for webpack to work and so we can tell it what to do
    
     webpack.config.js

added script to package.json this will watch for client side changes, anytime is a change it will rebundle for us
    
        "ourwebpack": "webpack --watch"

added script so that we can run both commands for watching changes 
    
        "dev":"run-p ourserver ourwebpack"

to test this works we will run 
    
     npm run dev

## Axios
Installing yet more packages, this one is to help with fetching, not really needed for loading or retreving data but helps with sending data
    
        npm install axios


## HTML CSS 
just templates used Bootstrap.css and own css file added Material-UI for stuff

## Security Adding password protection to Admin and other urls on my webpage
creating some custom middleware functionality we will only call next once parameters have been meet

    function passwordProtected(req, res, next) {
    res.set("WWW-Authenticate", "Basic realm='MERN Pet App'")
    if (req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
        next()
    } else {
        console.log(req.headers.authorization)
        res.status(401).send("Try Again")

    }

    }

username: 
password: 

this can be used for any route as an aditional argument. express calls these functions in order and this function will be a gatekeeper
values in password get base64 encoded pretty funny work around what we type into password and username fails but console outputs a Bas64 string that we can use
brute force attack would just go right through it

**File upload security**

We do not want to allow injections or malicious attacks. using MongoDB stops potential sql injection
we do not want to let users submit a value that can be interpreted as an object instead of a simple string because the object could hold mongoDB commands
in addition we will want to strip any html from the values. so we will clean data when we create a new animal or edit and exsisting animal
creating reusable middleware for this:

    function cleanupData(req, res, next) {
    if (typeof req.body.name != "string") req.body.name = ""
    if (typeof req.body.species != "string") req.body.species = ""
    if (typeof req.body._id != "string") req.body._id = ""
    }

this function takes what is input and if it is not a string will convert it into an empty field 

we will use another package to sanitise html
    npm install sanitize-html


## Multi part form handling 
with normal async (json) forms or html froms we use the following

    app.use(express.json()) //if browser sends json(async) to the server we can then access that data
    app.use(express.urlencoded({ extended: false })) //if someone is just submiting an html form we want to access that data

however this application uses multi part forms so we need a package to easily handle this, we only need this if we want users to send us files
    
    npm install multer


## React forms updating info
uses the CreateNewForm.js component Axios.post request this gives setAnimals a call and it adds new stuff

## Images
importing fs extra and sharp for resizing and magement of images
    
    npm install fs-extra sharp

## Home page
server will send plain HTML but will look like our admin card page and display all our animal cards
react compoenet for both client side javascript and server side rendering. 
edit node server to use webpack / babel

        const serverConfig = {
        entry: "./server.js",
        output: {
            path: __dirname,
            filename: "server-compiled.js"
        },
        externals: [nodeExternals(),
        target: "node",
        mode: "production",
        module: typicalReact
        }

by changing our nodemon script in package.json we can now use react jsx on the server side
    
    "ourserver": "nodemon server-compiled",



# Web Components 
Using Material-ui with emotion for usage with React 

    npm install @mui/material @emotion/react @emotion/styled

Material-ui usage is straight forward adding 

    import Button from '@mui/material/Button'

to the top of our component then allows us to use the pre styled buttons by calling what we want eg

    <Button color="secondary">Secondary</Button>
    <Button variant="contained" color="success">
        Success
    </Button>
    <Button variant="outlined" color="error">
        Error
    </Button>


we can create new colour themes for buttons etc its a bit complicated over just using some CSS to set a hex value though

[Adding new colours](https://mui.com/material-ui/customization/palette/#adding-new-colors)

Have wrapped stuff using the Material UI container setting a max width it is till resonsive but I feel like min max with css is nicer to use in my index.js

[Decent Video related to Material UI](https://www.youtube.com/watch?v=vyJU9efvUtQ)

