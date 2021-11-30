import express from "express"
// import express from "express"

// import cors from "cors"

import listEndpoints from "express-list-endpoints"

import authorsRouter from "./authors/index.js"

const server = express()
const port =  5000

server.use(express)
//Need to add this line before Endpoints request bodies, other wise bodies will be undefined.


//Letting the server to access the authors file
server.use("/authors", authorsRouter)

console.table(listEndpoints(server))
console.log(listEndpoints(server))

server.listen(port, () => {
    console.log(`My server is running on port: ${port}`)
})