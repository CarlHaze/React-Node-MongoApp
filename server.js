const { response } = require("express")
const express = require("express")
const { MongoClient, ObjectId } = require("mongodb") //connects to my mongoDB database
    //only need multer when letting users upload files
const multer = require('multer')
const upload = multer()
const sanitizeHTML = require('sanitize-html')
const fse = require('fs-extra')
const sharp = require('sharp')
const path = require('path') //this gives global pathing no matter if on win mac or linux

let db //global var for getting client DB

//when app first launches, make sure the public/uploaded-photos folder exists as git likes to delete empty folders
fse.ensureDirSync(path.join("public", "uploaded-photos"))

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
app.post("/create-animal", upload.single("photo"), cleanupData, async(req, res) => {
    //has the user added a file in the post
    if (req.file) {
        const photofilename = `${Date.now()}.jpg` //uniqure to any miliesecond for filenames
            //resize the image multer handles the file part
        await sharp(req.file.buffer).resize(844, 456).jpeg({ quality: 60 }).toFile(path.join("public", "uploaded-photos", photofilename))
        req.cleanData.photo = photofilename
            //above we have added the resized photo to our harddrive and we have added the photo name to the file we want to store in database
    }
    console.log(req.body)
        //saving new collection into MongoDB database
        //info will contain the _id of new document in Mongo
    const info = await db.collection("animals").insertOne(req.cleanData)
        //we want server to send back an object that represents the new animal doc that we just made back to browser
    const newAnimal = await db.collection("animals").findOne({ _id: new ObjectId(info.insertedId) }) //ObjectId requires we call somthing from MongoDB inorder to access this ObjectId in our deconstructed mongodb
    res.send(newAnimal)
})

app.delete("/animal/:id", async(req, res) => {
    //make sure id is a string if it is not set it to an empty string
    if (typeof req.params.id != "string") req.params.id = ""
})


function cleanupData(req, res, next) {
    if (typeof req.body.name != "string") req.body.name = ""
    if (typeof req.body.species != "string") req.body.species = ""
    if (typeof req.body._id != "string") req.body._id = ""

    //here we can santaise the values of any potential html using santitisehtml
    req.cleanData = { //triming any white spaces not allowing any html tags, not allowing any elements or attributes
        name: sanitizeHTML(req.body.name.trim(), { allowedTags: [], allowedAttributes: {} }),
        species: sanitizeHTML(req.body.species.trim(), { allowedTags: [], allowedAttributes: {} }),

    }

    next()
}

async function start() {

    const uri = "mongodb+srv://Carl_Ellis:mongodbtest@cluster0.j16jrhy.mongodb.net/MERN_App_DB?retryWrites=true&w=majority"; //login credentials for user created on MongoDB that points to the Database collection

    const client = new MongoClient(uri); //create instance of mongo client 


    await client.connect(); //connect to my client can throw an error   
    db = client.db()
    app.listen(3000)

}
start()