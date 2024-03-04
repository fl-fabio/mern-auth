import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");

import { createUser, findUserByEmail } from "../services/users.service";
import { createSecretToken } from "../utils/secretToken";
import { User } from "../models/user.model";

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    const extUser = await findUserByEmail(email);
    if (extUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await createUser({ email, password, username });
    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      httpOnly: false,
    });
    res
      .status(201)
      .json({
        message: "User signed in with successfully",
        success: true,
        user,
      });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const Logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
      next();
  } catch (error) {
    console.error(error);
  }
};
