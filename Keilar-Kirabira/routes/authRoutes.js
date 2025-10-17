const express = require("express");
const router = express.Router();
const passport = require('passport');

const UserModel = require("../models/userModel");
//getting the signup form
router.get("/signup", (req, res) => {
  res.render("signup", { title: "signup page" });
});


router.post("/signup", async (req, res) => {               
  try {
    const user = new UserModel(req.body);
    console.log(req.body);
    let existingUser = await UserModel.findOne({email:req.body.email});
    if (existingUser){
      return res.status(400).send("Already registered email")
    }else{
      await UserModel.register(user, req.body.password,(error)=>{
         if(error){
            throw error;
         }
         res.redirect("/"); // login route
      })
    }
  } catch (error) {
   res.status(400).send("Try again")
  } 
  // added this res.redirect that directs me to the login page from sginup.
});


router.get("/", (req, res) => {
  res.render("/");
});

router.post("/", (req,res) =>{
  
});



module.exports = router;