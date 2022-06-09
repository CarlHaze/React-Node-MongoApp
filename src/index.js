import React,{ useState, useEffect} from "react"
import { createRoot } from "react-dom/client"
import Axios from "axios"

import CreateNewForm from "./components/CreateNewForm"
import AnimalCard from "./components/AnimalCard"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { Container } from "@mui/system"
import { Link } from "@mui/icons-material"

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
        <Container maxWidth="xl">
            <Button variant='outlined' color='success' size='small' href="/" 
            sx={{
                ':hover':{
                    bgcolour:'primary.main',
                    color:'black',
                },
            }}>Back to homepage</Button>
            <div>
                <Typography variant='h2' component="div" gutterBottom align='center'>Manage Animals</Typography>
            </div>
            {/* create new animal to add to data*/}
            <CreateNewForm setAnimals={setAnimals} />

            <div className="animal-grid">
            {animals.map(function (animal){
                return <AnimalCard key={animal._id} name={animal.name} species={animal.species} photo={animal.photo} id={animal._id} setAnimals={setAnimals}/>
            })}
            </div>
            <br></br>
               <Button component="button" variant="body2" href="https://unsplash.com/" >Link to thousands of images</Button>
            
               
            
        </Container>
    )
 
}


//ref to empty div in admin.ejs
const root = createRoot(document.querySelector("#app"))
root.render(<App />)
