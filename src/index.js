import React from "react"
import { createRoot } from "react-dom/client"

function App(){
    return(   
        <div>
            <h1>Hello</h1>
            <p>Hi, This is from React</p>
        </div>
    )
 
}
//ref to empty div in admin.ejs
const root = createRoot(document.querySelector("#app"))
root.render(<App />)