import databaseConnect from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

databaseConnect()
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Server is listening on port ${process.env.PORT}`);
  })
  .catch((error) => {
    console.log(`Mongodb connection error: ${error}`);
  });
