/** @format */
import express from "express";
import usersSchema from "./usersSchema.js";
import createHttpError from "http-errors";
import { authorization } from "../middlewares/authorization.js";
import { adminOnlyMiddleware } from "../middlewares/adminHandle.js";

const UserRouter = express.Router();

UserRouter.route("/me")
  .get(async (req, res, next) => {
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
export default UserRouter;
