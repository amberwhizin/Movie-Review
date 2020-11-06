const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");

users.get("/new", (req, res) => {
  //new.ejs is reviews- new.ejs
  res.render("users/new.ejs", { currentUser: req.session.currentUser });
});

users.post("/", (req, res) => {
  //post users hashed password
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  //createdUser is coming up undefined, come back to this
  User.create(req.body, (error, createdUser) => {
    //console.log("boo", { body: req.body, createdUser, error });
     if (createdUser) {
      req.session.currentUser = createdUser;
      res.redirect("/critiques");
      // compare if the foundUser matches the password in dbs
    } else if (error) {
      res.send('<a href="users/new">Oh dear, there was an error </a>');
    } 
  });
});

console.log("controller/users.js is linked");
module.exports = users;
