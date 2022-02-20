import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "dotenv";
env.config();

const authorize = async (req: any, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json("Access Denied: Please log in!");
    }

    const payload: JwtPayload = jwt.verify(
      jwtToken,
      process.env.jwtSecret as any
    ) as JwtPayload;

    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json("Access Denied: Please log in!");
  }
};

export default authorize;
