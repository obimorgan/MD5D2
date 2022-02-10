/** @format */
import express, {Request, Response, NextFunction} from "express";
import usersSchema from "./usersSchema";
import createHttpError from "http-errors";
import { authorization } from "../middlewares/authorization";
import { adminOnlyMiddleware } from "../middlewares/adminHandle";

const UserRouter = express.Router();

UserRouter.get("/", authorization, async (req: Request, res: Response, next: NextFunction) => {
  //  .get(authorization, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersSchema.find();
      res.status(200).send(user);
      console.log("auth");
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await new usersSchema(req.body).save();
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

UserRouter.route("/:userId")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const user = await usersSchema.findById(userId);
      if (user) {
        res.status(201).send(user);
      } else {
        next(
          createHttpError(404, "user with this id:", userId, "is not found")
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put((authorization as any), (adminOnlyMiddleware as any), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const edituser = await usersSchema.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      console.log(edituser);
      if (edituser) {
        res.status(201).send(edituser);
      } else {
        next(
          createHttpError(404, "user with this id:", userId, "is not found")
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
   .delete((authorization as any), (adminOnlyMiddleware as any), async (req: Request, res: Response, next: NextFunction) => {
    console.log("hello");
    try {
      const userId = req.params.userId;
      const deleteauthor = await usersSchema.findByIdAndDelete(userId, {
        new: true,
      });
      console.log(deleteauthor);
      if (deleteauthor) {
        res.status(204).send(deleteauthor);
      } else {
        next(createHttpError(400, "SyntaxError"));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
export default UserRouter;
