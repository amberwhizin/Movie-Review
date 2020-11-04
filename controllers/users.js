const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");

users.get("/new", (req, res) => {
  //new.ejs is reviews- new.ejs
  res.render("users/new.ejs");
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
    res.redirect("/critiques");
  });
});

console.log("controller/users.js is linked");
module.exports = users;
