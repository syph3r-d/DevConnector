const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config=require('config')
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
//@route    GET api/users
//@desc     Test route
//@access   Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //400-Bad Request
    }

    const { name, email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email }); //email:email
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm", //default image if there isnt a gravatar
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10); //higher more secure but slow //if we not used await then we would have to write .then() method
      user.password = await bcrypt.hash(password, salt);

      
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id, //mongoose abstraction
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      console.log(req.body);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
