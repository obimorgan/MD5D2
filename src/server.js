import express from "express"
// import express from "express"

// import cors from "cors"

import listEndpoints from "express-list-endpoints"

import authorsRouter from "./authors/index.js"

const server = express()
const port =  3001

server.use(express)
//Need to add this line before Endpoints request bodies, other wise bodies will be undefined.


//Letting the server to access the authors/idex.js file
server.use("/authors", authorsRouter)

console.log("The list of end Points:", listEndpoints(server))

server.listen(port, () => {
    console.log(`My server is running on port: ${port}`)
})