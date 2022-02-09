/** @format */
import express from "express";
import { authorization } from "../middlewares/authorization.js";
import blogsSchema from "../blogs/blogsSchema.js";

const userMeRouter = express.Router();

userMeRouter.route("/stories").get(authorization, async (req, res, next) => {
  try {
    const blogPosts = await blogsSchema
      .find({
        authors: req.user._id, //user._id comes from the authorizations (username and password)
      })
      .populate("blogs");
    console.log(req.user._id);
    res.send(blogPosts);
  } catch (error) {
    next(error);
  }
});

userMeRouter
  .route("/")
  .put(authorization, async (req, res, next) => {
    try {
      req.user.first_name = "John";
      await req.user.save();
      res.send();
    } catch (error) {
      next(error);
    }
  })
  .delete(authorization, async (req, res, next) => {
    try {
      await req.user.deleteOne();
      res.send();
    } catch (error) {
      next(error);
    }
  });
export default userMeRouter;
