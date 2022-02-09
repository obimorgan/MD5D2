/** @format */

import createHttpError from "http-errors";
import {Request} from "express";

export const adminOnlyMiddleware = (req: Request, next: (arg: unknown) => void) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    next(createHttpError(403, "Admin only endpoint!"));
  }
};
