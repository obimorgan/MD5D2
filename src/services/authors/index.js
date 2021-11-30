import express from "express"
import fs from "fs"
import { fileURLToPath} from "url"
import{ dirname, join } from "path"
import uniqid from "uniqid"

const authorsRouter = express.Router()

//---- authors.json path ----//

// 1) start from the current file

const currentFilePath = fileURLToPath(import.meta.currentFilePath)

// 2) get the current folder the file current file is in

const currentFolderPath = dirname(currentFilePath)

// 3) Concatenate  current folder path with blog.json

const authorsJSONPath = join(currentFolderPath, "authors.json")

//---- Linking the router to each request method

// Posting new authors
authorsRouter.post("/", (req, res) => {
    console.log(res)

    // 1) read the request body
    console.log("BODY: ", req.body)

    // 2)add some server generated  info(id, creation date)
    const newAuthor = {...req.body, createdAt: new Date(), id: uniqid()}
    console.log(newauthor)

    // 3) read authors.json obtaining an array
    const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

    // 4) add new authors to the array(push)
    authors.push(newauthors)

    // 5) write the array back to the file
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

    // 6) Send back appropriate response
    res.status(201).send({id: newauthors.id})
})

//Fetch authors
authorsRouter.get("/", (req, res) => {
    // 1) read the content authors.json file
    console.log("IMPORT META URL: ", import.meta.url)
    console.log("Current file path is:", currentFilePath)

    const fileContent = fs.readFileSync(usersJSONPath)
    // returns buffer object only machine readable

    console.log("File Content:", JSON.parse(fileContent))

    // Parsing the unreadable files in json readable file
    const authorsArray = JSON.parse(fileContent)

    // Sends back the response
    res.send(authorsArray)
})

// Fetch authors by ID
authorsRouter.get("/:blogId", (req, res) => {
    console.log("Blog's Id:", req.params.blogId)

    // 1)Read the authors content
    const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

    // 2)Find the blog by ID in the array
    const blog = authors.find(b=> b.id === res.params.blogId)

    // 3) Send the found back as response
    res.send(blog)
})

// Edit blog by ID
authorsRouter.put("/:blogId", (req, res) => {

    // 1) Read blog content
    const authors = JSON.parse(fs.readFileSync(usersJSONPath))

    //2) Edit Blog
    const index = authors.findIndex(b => b.id === req.params.blogId)
    const updateBlog = { ...authors[index], ...req.body}

    authors[index] = updateBlog

    // 3) save the edited content to the list of authors
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

})

authorsRouter.delete()

export default authorsRouter