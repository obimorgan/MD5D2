/** @format */

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();

// 1) start from the current file
const authorsFilePath = fileURLToPath(import.meta.url);

// 2) get the current folder the file current file is in
const currentFolderPath = dirname(authorsFilePath);

// 3) Concatenate  current folder path with blog.json
const authorsFilePathJSon = join(currentFolderPath, "authors.json")



// console.log("IMPORT META URL: ", import.meta.url);
// console.log("Current file path is:", authorsFilePath);


//Fetch Authors
authorsRouter.get("/authors", (req, res) => {


    res.send("Hello")
    
    const fileContent = fs.readFileSync(authorsFilePathJSon);
    // console.log("File Content:", JSON.parse(fileContent));
    // const fileContentArray = fileContent.toString();

    const authorsArray = (fileContent);
    res.send(authorsArray);

});

//Post a new author
authorsRouter.post("/authors", (req, res) => {
  const newAuthor = { ...req.body, created: new Date(), id: uniqid()}
  const authors = JSON.parse(fs.readFileSync(authorsFilePathJSon))
  authors.push(newAuthor)
  fs.writeFileSync(authorsFilePathJSon, JSON.stringify(authors))
  res.status(201).send({id: newAuthor.id})
});

//delete an author (by Id)
authorsRouter.delete("/authors/:id", async (req, res) => {
  try {
  } catch (error) {
    res.send(500).send({ mesage: error.message });
  }
});
//edit an author (id)
authorsRouter.put("/:id", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({ mesage: error.message });
  }
});


//Fetch an author by Id
authorsRouter.get("/authors/:id", async (req, res) => {
  try {
    const fileAsABuffer = fs.readFileSync(authorsFilePath);
    const fileAsASttring = fileAsABuffer.toString();
    const fileAsJson = JSON.parse(fileAsASttring);
    const author = fileAsJson.find(a => a.id === req.params.id)

    if(!author) {
      res.status(404).send({message:`The Author by this id: ${req.params.id} does not exist`})
    }

  } catch (error) {
    res.status(500).send({ mesage: error.message });
  }
});

// authorsRouter.get("/:blogId", (req, res) => {

//     console.log("Blog's Id:", req.params.blogId)

//     // 1)Read the authors content
//     const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

//     // 2)Find the blog by ID in the array
//     const author = authors.find(b=> b.id === res.params.authors.id)

//     // 3) Send the found back as response
//     res.send(author)
// })

// Edit blog by ID
authorsRouter.put("/authors/Id", (req, res) => {

    // 1) Read blog content
    const authors = JSON.parse(fs.readFileSync(usersJSONPath))

    //2) Edit Blog
    const index = authors.findIndex(b => b.id === req.params.id)
    const updateAuthor = { ...authors[index], ...req.body}

    authors[index] = updateAuthor

    // 3) save the edited content to the list of authors
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

})

// Delete author
authorsRouter.delete("authors/:id", async (req, res) => {
  try {
    const fileAsABuffer = fs.readFileSync(authorsFilePath);
    const fileAsASttring = fileAsABuffer.toString();

    // Change const fileAsJson to let fileAsJson to enable delete
    let fileAsJson = JSON.parse(fileAsASttring);
    const author = fileAsJson.find(a => a.id === req.params.id)

    if(!author) {
      res.status(404).send({message:`The Author by this id: ${req.params.id} does not exist`})
    }
    fileAsJson = fileAsJson.filter(a => a.id !== req.params.id)
    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJson))
    res.status(204).send()

  } catch (error) {
    res.send(500).send({ mesage: error.message });
  }
});



export default authorsRouter;
