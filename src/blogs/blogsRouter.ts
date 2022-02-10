/** @format */
import express, {Request, Response, NextFunction} from "express";
import blogsSchema from "./blogsSchema";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";

const blogsRouter = express.Router();

blogsRouter
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mongoQuery = q2m(req.query);
      const blog = await blogsSchema.find(mongoQuery).populate("authors");
      res.status(200).send(blog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newblog = await new blogsSchema(req.body).save();
      res.status(201).send(newblog);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

blogsRouter
  .route("/:BlogId")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.BlogId;
      const Blog = await blogsSchema.findById(blogId);
      if (Blog) {
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
  .put(async (req: Request, res: Response, next: NextFunction) => {
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
  .delete(async (req: Request, res: Response, next: NextFunction) => {
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
