const express=require('express')
const router=express.Router();
const auth=require('../../middleware/auth')
const bcrypt = require("bcryptjs");
const User=require('../../models/User')
const jwt = require("jsonwebtoken");
const config=require('config')
const { check, validationResult } = require("express-validator");

//@route    GET api/auth
//@desc     Test route
//@access   Public

router.get('/',auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password'); //leave the password out
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//@route    POST api/auth
//@desc     validate email and password
//@access   Public

router.post(
    "/",
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter the password"
      ).exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //400-Bad Request
      }
  
      const { email, password } = req.body;
  
      try {
        // see if user exists
        let user = await User.findOne({ email }); //email:email
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
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
        // console.log(req.body);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );

module.exports=router;