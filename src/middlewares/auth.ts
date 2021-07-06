import { Response, NextFunction, Request } from "express";
import HttpStatusCodes from "http-status-codes";
import { verify } from '../services/jwt';
import { IUser } from './../models/user';

const authMiddleware = function(req: Request, res: Response, next: NextFunction): any {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "No token, authorization denied" });
  }
  // Verify token
  try {
    const payload = verify(token);
    req.user = payload;
    next();
  } catch (err) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "Token is not valid" });
  }
};

export {
  authMiddleware
}