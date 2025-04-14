import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authToken = req.header("authentication");

  const token = authToken && authToken.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  // jwt.verify()
}
