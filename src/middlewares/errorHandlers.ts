/** @format */
import {Response, NextFunction} from 'express'

export const errorHandlers = (err: Error, res: Response, next: NextFunction) => {
  switch (err.name) {
    case "BadRequestError":
    case "ValidationError":
    case "CastError":
    case "TypeError":
    case "ObjectParameterError":
    case "MongoServerError":
      res.status(400).send(err);
      break;
    case "UnauthorizedError":
      res.status(401).send(err);
    case "NotFoundError":
      res.status(404).send(err);
      break;
    default:
      res.status(500).send("Server Error");
  }
};
