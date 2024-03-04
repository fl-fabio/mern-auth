import express from "express";
const cors = require("cors");
const cookieParser = require("cookie-parser");

export const app = express();

import { router as authRouter } from "./routes/auth.route";

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

//configure the middleware for body requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/status", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/", authRouter);
