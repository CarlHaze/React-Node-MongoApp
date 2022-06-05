const { response } = require("express")
const express = require("express")
const { MongoClient } = require("mongodb") //connects to my mongoDB database

let db //global var for getting client DB


// async function main() {
//     //connect to MongoDB cluster, call functions that create the DB and disconect from cluster

//     const uri = "mongodb+srv://Carl_Ellis:mongodbtest@cluster0.j16jrhy.mongodb.net/?retryWrites=true&w=majority"; //login credentials for user created on MongoDB

//     const client = new MongoClient(uri); //create instance of mongo client 

//     //this returns a promise await means wait until current opertaion is completed
//     try {
//         await client.connect(); //connect to my client can throw an error   

//         await listDatabases(client);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }


// }

// main().catch(console.error);

// /**
//  * Print the names of all available databases
//  * @param {MongoClient} client A MongoClient that is connected to a cluster
//  */
// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

const app = express()
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public"))

app.get("/", async(req, res) => {
    const allAnimals = await db.collection("animals").find().toArray() //need to pass DB results into our render template
    res.render("home", { allAnimals }) //we will render template called home.ejs
})

app.get("/admin", (req, res) => {
    res.render("admin")
})

async function start() {

    const uri = "mongodb+srv://Carl_Ellis:mongodbtest@cluster0.j16jrhy.mongodb.net/MERN_App_DB?retryWrites=true&w=majority"; //login credentials for user created on MongoDB that points to the Database collection

    const client = new MongoClient(uri); //create instance of mongo client 


    await client.connect(); //connect to my client can throw an error   
    db = client.db()
    app.listen(3000)

}
start()