const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/users.js");

const users = express.Router();

users.get("/new", (req, res) => {
  //new.ejs is reviews- new.ejs
  res.render("users/new.ejs");
});

module.exports = users;
