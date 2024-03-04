const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import { findUserById } from "../services/users.service";

export const userVerification = (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, "fabio", async (err: any, data: any) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await findUserById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};
