const User = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//login
router.post("/", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });

    if (!foundUser) {
      res.status(403).json({ msg: "username or password incorrect" });
    } else {
      const verified = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );
      
      if (verified) {
        const { password, email, ...others } = foundUser._doc;
        res.status(200).json(others);
      } else {
        res.status(403).json({ msg: "username or password incorrect" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
