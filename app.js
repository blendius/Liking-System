const express = require("express");
const router = require("./routes/auth");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//import routes
const authRoute = require("./routes/auth");
const likesRoute = require("./routes/likes");

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected to Database")
);

//middleware
app.use(express.json());
//route middleware
app.use("/api", authRoute);
app.use("/api", likesRoute);

module.exports = app;
