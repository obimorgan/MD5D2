/** @format */

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
// import { dirname, join } from "path";
import path, { dirname } from "path";
import uniqid from "uniqid";

// 1) start from the current file

const authorsFile = fileURLToPath(import.meta.url);

// 2) get the current folder the file current file is in
const currentFolderPath = dirname(authorsFile);

// 3) Concatenate  current folder path with blog.json
const authorsFilePath = path.join(currentFolderPath, "authors.json");

const authorsRouter = express.Router();
console.log(authorsRouter);

console.log("IMPORT META URL: ", import.meta.url);
console.log("Current file path is:", authorsFilePath);
//---- Linking the router to each request method

//Fetch Authors
authorsRouter.get("/", async (req, res) => {
  try {
    // 1) read the content authors.json file

    // returns buffer object only machine readable
    const fileContent = fs.readFileSync(authorsJSONPath);
    console.log("File Content:", JSON.parse(fileContent));

    //Convert buffer contents to strings
    const fileContentAsStrings = fileContent.toString();

    // Parsing the files of strings to a json readable file
    const authorsArray = JSON.parse(fileContentAsStrings);

    // Sends back the response
    res.send(authorsArray);
  } catch (error) {
    res.sen(500).send({ mesage: error.message });
  }
});

// //Fetch an author by Id
// authorsRouter.get("/:id", async (req, res) => {
//   try {
//   } catch (error) {
//     res.sen(500).send({ mesage: error.message });
//   }
// });

//Post a new author
authorsRouter.post("/", async (req, res) => {
  // console.log("The res is:", res);

  try {
    // 1) read the request body
    const { name, surname, email, dateOfBirth } = req.body;
    // console.log("BODY: ", req.body);

    // 2)add some server generated  info(id, creation date)
    const author = {
      id: uniqid(),
      name,
      surname,
      dateOfBirth,
      avatar: ` https://ui-avatars.com/api/?name=${name}+${surname}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const fileAsABuffer = fs.readFileSync(authorsFilePath);
    const fileAsASttring = fileAsABuffer.toString();
    const fileAsJson = JSON.parse(fileAsASttring);

    // 4) add new authors to the array(push)
    // authors.push(newauthors);
    fileAsJson.push(author);

    // 5) write the array back to the file
    // fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));
    fs.writeFileSync(authorsFilePath.JSON.stringify(fileAsJson))

    // const author = { ...req.body, createdAt: new Date(), id: uniqid() };
    // console.log(author);

    // 3) read authors.json obtaining an array
    // const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

    // 6) Send back appropriate response
    res.status(201).send({ id: author.id });
  } catch (error) {
    res.sen(500).send({ mesage: error.message });
  }
});

//delete an author (by Id)
authorsRouter.delete("/:id", async (req, res) => {
  try {
  } catch (error) {
    res.sen(500).send({ mesage: error.message });
  }
});
//edit an author (id)
authorsRouter.put("/:id", async (req, res) => {
  try {
  } catch (error) {
    res.sen(500).send({ mesage: error.message });
  }
});

// // Fetch authors by ID
// authorsRouter.get("/:blogId", (req, res) => {
//     console.log("Blog's Id:", req.params.blogId)

//     // 1)Read the authors content
//     const authors = JSON.parse(fs.readFileSync(authorsJSONPath))

//     // 2)Find the blog by ID in the array
//     const blog = authors.find(b=> b.id === res.params.blogId)

//     // 3) Send the found back as response
//     res.send(blog)
// })

// // Edit blog by ID
// authorsRouter.put("/:blogId", (req, res) => {

//     // 1) Read blog content
//     const authors = JSON.parse(fs.readFileSync(usersJSONPath))

//     //2) Edit Blog
//     const index = authors.findIndex(b => b.id === req.params.blogId)
//     const updateBlog = { ...authors[index], ...req.body}

//     authors[index] = updateBlog

//     // 3) save the edited content to the list of authors
//     fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))

// })

// authorsRouter.delete()

export default authorsRouter;
