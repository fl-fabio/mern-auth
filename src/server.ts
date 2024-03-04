import { app } from "./app";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/auth")
  .then(() => {
    app.listen(3002, () => {
      console.log(`Server running on port 3002`);
    });
  })
  .catch((error) => console.error(error));
