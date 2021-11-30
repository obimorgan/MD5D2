import express from "express"
import fs from "fs"
import { fileURLToPath} from "url"
import{ dirname, join } from "path"
import uniqid from "uniqid"

const blogsRouter = express.Router()

//---- blogs.json path ----//

// 1) start from the current file

const currentFilePath = fileURLToPath(import.meta.currentFilePath)

// 2) get the current folder the file current file is in

const currentFolderPath = dirname(currentFilePath)

// 3) Concatenate  current folder path with blog.json

const blogsJSONPath = join(currentFolderPath, "blogs.json")

//---- Linking the router to each request method

// Posting new blogs
blogsRouter.post("/", (req, res) => {
    console.log(res)

    // 1) read the request body
    console.log("BODY: ", req.body)

    // 2)add some server generated  info(id, creation date)
    const newBlogs = {...req.body, createdAt: new Date(), id: uniqid()}
    console.log(newBlogs)

    // 3) read blogs.json obtaining an array
    const blogs = JSON.parse(fs.readFileSync(blogsJSONPath))

    // 4) add new blogs to the array(push)
    blogs.push(newBlogs)

    // 5) write the array back to the file
    fs.writeFileSync(blogsJSONPath, JSON.stringify(blogs))

    // 6) Send back appropriate response
    res.status(201).send({id: newBlogs.id})
})

//Fetch Blogs
blogsRouter.get("/", (req, res) => {
    // 1) read the content blogs.json file
    console.log("IMPORT META URL: ", import.meta.url)
    console.log("Current file path is:", currentFilePath)

    const fileContent = fs.readFileSync(usersJSONPath)
    // returns buffer object only machine readable

    console.log("File Content:", JSON.parse(fileContent))

    // Parsing the unreadable files in json readable file
    const blogsArray = JSON.parse(fileContent)

    // Sends back the response
    res.send(blogsArray)
})

// Fetch blogs by ID
blogsRouter.get("/:blogId", (req, res) => {
    console.log("Blog's Id:", req.params.blogId)

    // 1)Read the blogs content
    const blogs = JSON.parse(fs.readFileSync(blogsJSONPath))

    // 2)Find the blog by ID in the array
    const blog = blogs.find(b=> b.id === res.params.blogId)

    // 3) Send the found back as response
    res.send(blog)
})

// Edit blog by ID
blogsRouter.put("/:blogId", (req, res) => {

    // 1) Read blog content
    const blogs = JSON.parse(fs.readFileSync(usersJSONPath))

    //2) Edit Blog
    const index = blogs.findIndex(b => b.id === req.params.blogId)
    const updateBlog = { ...blogs[index], ...req.body}

    blogs[index] = updateBlog

    // 3) save the edited content to the list of blogs
    fs.writeFileSync(blogsJSONPath, JSON.stringify(blogs))
    
})

blogsRouter.delete()

export default blogsRouter