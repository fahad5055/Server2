const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const usersRoute = require("./Route/UsersRoute");
const productRoute = require("./Route/ProductRoute");
const CategoryRoute = require("./Route/CategoryRoute");
const tokenVerify = require("./Middleware/verifyToken");

// admin panel api
app.get("/api/verify", tokenVerify);
app.use("/api/users", usersRoute);
app.use("/api/product", productRoute);
app.use("/api/category", CategoryRoute);

// website api
const WebRoute = require("./WebRoute");
app.use("/api/web", WebRoute);

app.get("/", (req, res) => {
  res.send("<h1>We are Running & continue</h1>");
});

// Server code
app.listen(port, () => {
  console.log(`App is Running http://localhost:${port}`);
  mongoose
    .connect(
      "mongodb+srv://class01:bZB52bi81OPOqY5I@cluster0.mbfkc.mongodb.net/ecommerce"
    )
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.error("Error occurred during Database Connection:", err);
    });
});
