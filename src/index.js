import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";

dotenv.config();
const app = express();

const port = process.env.PORT;
const url = process.env.MONGO_DB;

app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
routes(app);
mongoose
  .connect(`${url}`)
  .then(() => {
    console.log(`Connection MongoDB is success!`);
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });

//  run server
app.listen(port, () => {
  console.log(`Server  is running with port: ${port}`);
});
