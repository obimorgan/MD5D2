/** @format */

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import UserRouter from "./users/userRouter.js";
import blogsRouter from "./blogs/blogsRouter.js";

const server = express();
const PORT = 3001;

server.use(express.json());
server.use(cors());

server.use("/", UserRouter);
server.use("/blogs", blogsRouter);

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo");
  server.listen(PORT, () => {
    console.log("Server listens to port:", PORT);
    console.table(listEndpoints(server));
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
