const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Hello Deepak from server router js");
});

//registered
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if ((!name || !email || !phone, !work || !password || !cpassword)) {
    return res.status(422).json({ error: "please fill the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != password) {
      return res.status(422).json({ error: "password not matching" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });
      await user.save();
      res.status(201).json({ message: "user registered sucessfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

//login route

router.post("/signin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({ error: "please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);
      //Storing token as cookie
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res.status(400).json({ error: "invalid credentials" });
      } else {
        return res.json({ message: "user signin sucessfully" });
      }
    } else {
      return res.status(400).json({ error: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
