const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");

users.get('/new', (req, res) => {
    //new.ejs is reviews- new.ejs
    res.render('users/new.ejs')
})

module.exports = users;
