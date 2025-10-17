const express = require("express");
const router = express.Router();
const passport = require('passport');

const UserModel = require("../models/userModel");
//getting the signup form
router.get("/signup",  (req, res) => {
  res.render("signup", { title: "signup page" });
});


router.post("/signup", async (req, res) => {               
  try {
    console.log('Request body:', req.body);
    
    const { fullName, email, phoneNumber, password } = req.body;
    
    
    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).send("All fields are required");
    }

    // Check if user exists
    let existingUser = await UserModel.findOne({email: email});
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    
    const newUser = new UserModel({
      fullName,
      email,
      phoneNumber
    });

    UserModel.register(newUser, password, (error, user) => {
      if (error) {
        console.log('Registration error:', error);
        return res.status(400).send(`Registration failed: ${error.message}`);
      }
      
      console.log('User registered successfully:', user);
      res.redirect("/"); // login route
    });

  } catch (error) {
    console.log('Catch block error:', error);
    res.status(400).send("Registration failed. Please try again.");
  } 
});


router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", (req,res) =>{
  
});



module.exports = router;