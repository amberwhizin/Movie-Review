const bcrypt = require("bcrypt");
const express = require("express");
const { model } = require("../models/users.js");
const sessions = express.Router();
//using my users model!
const User = require("../models/users.js");

//users new session/logged-in
sessions.get('/new', (req, res) => {
    res.send('sessions/new.ejs')
})

module.exports = sessions
