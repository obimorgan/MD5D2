import express from "express"

import listEndpoints from "express-list-endpoints"

import authorsRouter from "./authors/index.js"

const server = express()
const port =  3001

server.use(express.json())
//Need to add this line before Endpoints request bodies, other wise bodies will be undefined.


//Letting the server to access the authors/index.js file
server.use("/", authorsRouter)

console.log("The list of end Points:", listEndpoints(server))

server.listen(port, () => {
    console.log(`My server is running on port: ${port}`)
})