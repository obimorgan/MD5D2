import express from "express"

// import express from "express"
import listEndpoints from "express-list-endpoints"

import blogsRouter from "services/blogs/index.js"

const server = express()
const port =  3001

server.use(express)
//Need to add this line before Endpoints request bodies, other wise bodies will be undefined.


server.use("/blogs", blogsRouter)

console.table(listEndpoints(server))

server.listen(port, () => {
    console.log(`My server is running on port: ${port}`)
})