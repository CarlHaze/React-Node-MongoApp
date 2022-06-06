const { response } = require("express")
const express = require("express")
const { MongoClient } = require("mongodb") //connects to my mongoDB database
    //only need multer when letting users upload files
const multer = require('multer')
const upload = multer()

let db //global var for getting client DB


const app = express()
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public"))

//this is good for normal functionality
app.use(express.json()) //if browser sends json(async) to the server we can then access that data
app.use(express.urlencoded({ extended: false })) //if someone is just submiting an html form we want to access that data

//our browers sends multipart froms so we need a multer package

// values in password get base64 encoded

function passwordProtected(req, res, next) {
    res.set("WWW-Authenticate", "Basic realm='MERN Pet App'")
    if (req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
        next()
    } else {
        console.log(req.headers.authorization)
        res.status(401).send("Try Again")

    }

}

app.get("/", async(req, res) => {
    const allAnimals = await db.collection("animals").find().toArray() //need to pass DB results into our render template
    res.render("home", { allAnimals }) //we will render template called home.ejs
})


//any url after this need to use passwordProtected middleware order matters
app.use(passwordProtected)

app.get("/admin", (req, res) => {
    res.render("admin")
})

app.get("/api/animals", async(req, res) => {
    const allAnimals = await db.collection("animals").find().toArray()
    res.json(allAnimals)
})

//Axios.post("/create-animal") create a route for this for our server this is in the CreateNewForm.js
//sending data this is handling a multi part from we need to include upload middleware (multer)
//we want to only allow uploading of one single photo hence upload.single
app.post("/create-animal", upload.single("photo"), async(req, res) => {
    console.log(req.body)
    res.send("Thank you")
})


function cleanupData(req, res, next) {
    if (typeof req.body.name != "string") req.body.name = ""
    if (typeof req.body.species != "string") req.body.species = ""
    if (typeof req.body._id != "string") req.body._id = ""
}

async function start() {

    const uri = "mongodb+srv://Carl_Ellis:mongodbtest@cluster0.j16jrhy.mongodb.net/MERN_App_DB?retryWrites=true&w=majority"; //login credentials for user created on MongoDB that points to the Database collection

    const client = new MongoClient(uri); //create instance of mongo client 


    await client.connect(); //connect to my client can throw an error   
    db = client.db()
    app.listen(3000)

}
start()