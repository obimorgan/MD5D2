/** @format */
import express from "express";
import blogsSchema from "./blogsSchema";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";

const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const mongoQuery = q2m(req.query);
      const blog = await blogsSchema.find(mongoQuery).populate("authors");
      res.status(200).send(blog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  .post(async (req, res, next) => {
    try {
      const newblog = await blogsSchema(req.body).save();
      res.status(201).send(newblog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

blogsRouter
  .route("/:BlogId")
  .get(async (req, res, next) => {
    try {
      const blogId = req.params.BlogId;
      const Blog = await blogsSchema.findById(blogId);
      if (blog) {
        res.status(201).send(Blog);
      } else {
        next(
          createHttpError(404, "Blog with this id:", blogId, "is not found")
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const blogId = req.params.BlogId;
      const editBlog = await blogsSchema.findByIdAndUpdate(blogId, req.body, {
        new: true,
      });
      console.log(editBlog);
      if (editBlog) {
        res.status(201).send(editBlog);
      } else {
        next(
          createHttpError(404, "Blog with this id:", blogId, "is not found")
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    console.log("hello");
    try {
      const blogId = req.params.BlogId;
      const deleteBlog = await blogsSchema.findByIdAndDelete(blogId, {
        new: true,
      });
      console.log(deleteBlog);
      if (deleteBlog) {
        res.status(204).send(deleteBlog);
      } else {
        next(createHttpError(400, "SyntaxError"));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
export default blogsRouter;
