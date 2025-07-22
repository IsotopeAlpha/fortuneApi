import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import usersRoute from "./routes/users.js";
import productsRoute from "./routes/products.js";
import ordersRoute from "./routes/orders.js";
import mongoose from "mongoose";

const port = process.env.PORT || 8000;

const app = express();
dotenv.config();


const connect = () => {
  try {
    mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/FortuneSales",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to mongoDB Database");
  } catch (error) {
    console.log(error);
  }

};

connect();

//middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/orders", ordersRoute);

app.get("/", (req, res) => {
  res.send("Fortune Sales Api");
});

app.listen(port, () => {
  console.log(`Connected on server port: ${port}`);
});
