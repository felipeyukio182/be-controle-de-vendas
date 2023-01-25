import { NextFunction, Request, Response } from "express";

export const authMid = (req: Request, res: Response, next: NextFunction) => {
  next();
};
