const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

require("./db/conn");

// const User = require('./model/userSchema')
app.use(express.json())

app.use(require("./router/auth"));

const PORT = process.env.PORT;

//Middleware
const middleware = (req, res, next) => {
  console.log("Hello my middleware");
  next();
};

app.get("/", (req, res) => {
  res.send("Hello Deepak from server appjs");
});

app.get("/about", middleware, (req, res) => {
  res.cookie("Test", "deepak")
  res.send("Hello from about server");
});
app.get("/contact", (req, res) => {
  res.send("Hello from contact server");
});
app.get("/singin", (req, res) => {
  res.send("Hello from login");
});
app.get("/signup", (req, res) => {
  res.send("Hello from registration");
});

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
