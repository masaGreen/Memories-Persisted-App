const User = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//register

router.post("/", async (req, res) => {
 
    try {
      const hashedPwd = await bcrypt.hash(req.body.password, 10)
      
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPwd,
      });
      
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      // console.log(error)
      if (error.code === 11000) {
        res.status(500).send("user already exists");
      } else {
        res.status(500).send("something went wrong try again");
      }
    }
  });
  module.exports = router