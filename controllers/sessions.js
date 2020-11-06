const bcrypt = require("bcrypt");
const express = require("express");
//using my users model!
const User = require("../models/users.js");
const sessions = express.Router();

//users new session/login page
sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs", { currentUser: req.session.currentUser }); //refer to access to user for all gets
});

//do username and password match edge-cases
sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (error, foundUser) => {
    if (error) {
      res.send('<a href="sessions/new">Oh dear, there was an error </a>');
    } else if (!foundUser) {
      res.send('<a href="sessions/new">Username not found</a>');
      // compare if the foundUser matches the password in dbs
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        //then set the information that was entered by the user to the foundUser
        req.session.currentUser = foundUser;
        res.redirect("/critiques");
      } else {
        res.send('<a href="sessions/new">Password incorrect</a>');
      }
    }
  });
});

//log out
sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/sessions/new");
  });
});

module.exports = sessions;
