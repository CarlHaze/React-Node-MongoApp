import React,{ useState, useEffect} from "react"
import { createRoot } from "react-dom/client"
import Axios from "axios"

import CreateNewForm from "./components/CreateNewForm"
import AnimalCard from "./components/AnimalCard"

function App(){
    // destructing animals lets us access that values, setAnimals lets us update it in the future
    const [animals, setAnimals] = useState([])

    useEffect(()=>{
        async function go(){
            const response = await Axios.get("/api/animals")
            setAnimals(response.data)
        }
        go()
    },[])

    return(   
        <div className="container">
            <p><a href="/">&laquo;Back to homepage</a></p>
            {/* create new animal to add to data*/}
            <CreateNewForm setAnimals={setAnimals} />

            <div className="animal-grid">
            {animals.map(function (animal){
                return <AnimalCard key={animal._id} name={animal.name} species={animal.species} photo={animal.photo} id={animal._id} setAnimals={setAnimals}/>
            })}
            </div>
          
        </div>
    )
 
}


//ref to empty div in admin.ejs
const root = createRoot(document.querySelector("#app"))
root.render(<App />)
