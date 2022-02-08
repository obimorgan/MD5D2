/** @format */
import express from "express";
import { authorization } from "../middlewares/authorization.js";
import blogsSchema from "../blogs/blogsSchema.js";

const userMeRouter = express.Router();

userMeRouter.route("/stories").get(async (req, res, next) => {
  try {
    const newBlog = await blogsSchema(req.body);
    console.log(newBlog);
    const createdBlog = await newBlog.save();
    res.send(authors._id);
  } catch (error) {
    console.log(error);
  }
});

//   .put(authorization, async (req, res, next) => {
//     try {
//       req.user.first_name = "John";
//       await req.user.save();
//       res.send();
//     } catch (error) {
//       next(error);
//     }
//   })
//   .delete(authorization, async (req, res, next) => {
//     try {
//       await req.user.deleteOne();
//       res.send();
//     } catch (error) {
//       next(error);
//     }
//   });
export default userMeRouter;
