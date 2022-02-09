/** @format */

import createHttpError from "http-errors";
import { Request, NextFunction } from "express";


export const adminOnlyMiddleware = (req: Request, next: NextFunction) => {
   if ((req as any).user.role === "Admin") {
    next();
  } else {
    next(createHttpError(403, "Admin only endpoint!"));
  }
};
