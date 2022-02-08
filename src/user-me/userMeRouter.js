/** @format */
import express from "express";
import { authorization } from "../middlewares/authorization.js";

const userMeRouter = express.Router();

userMeRouter
  .route("/me")
  .get(authorization, async (req, res, next) => {
    res.send(req.user);
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
export default userMeRouter;
