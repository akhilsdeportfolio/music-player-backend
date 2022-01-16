const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth = require('../middlwares/auth');


function newToken(user) {       

       return jwt.sign({user}, "akhilkamsala");
}

router.post("/signup", async (req, res) => {

       const name = req.body.name;
       const email = req.body.email;
       const password = req.body.password;



       try {

              const resp = await User.create({ name, email, password });

              if (resp) {
                     res.status(201).send({ message: "user created succesfully",token:newToken(resp)});
              }
              else {
                     res.status(500).send({ error: "something went wrong while creating the user" })
              }





       } catch (e) {
              res.status(400).send({ error: "something went wrong", message: e.message })
       }





});


router.post("/login", async (req, res) => {

       const email = req.body.email;
       const password = req.body.password;



       try {

              let user = await User.findOne({ email: { $eq: email}});
              
              
              if (!user) {
                     res.status(401).send({ message: "No user found", error: "Create a new account" });
              }
              else {


                     if (user.checkPassword(password)) {                                    
                            res.status(201).send({ message: "login success", token: newToken(user) })
                     }
                     else {
                            res.status(401).send({ message: "please check your password" });
                     }



              }







       }
       catch (e) {
              
              res.status(500).send({ error: e.message, message: "something went wrong" });
       }
})



router.get("/users",auth,async (req, res) => {

       //console.log(req.user);

       let resp = await User.find({},{password:0,createdAt:0,updatedAt:0}).lean().exec();
       let user = req.user;
       delete user['password'];
       try {
              if (resp.length > 0) {
                     res.status(200).send({ userCount: resp.length, users: resp ,requestedUser:user});
              }
              else {
                     res.status(200).send({ error: "no users found", users: resp })
              }
       }
       catch (e) {
              res.status(400).send({ error: "something went wrong", message: e.message })
       }
});




module.exports = router;