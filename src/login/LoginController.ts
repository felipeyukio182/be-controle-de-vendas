import { Request, Response } from "express";

export const LoginController = (req: Request, res: Response) => {
  res.status(200).json({ login: "login", query: req.query });
};
