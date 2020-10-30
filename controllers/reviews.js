const express = require("express");
const critique = express.Router();

//new
critique.get("/new", (req, res) => {
  res.render("new.ejs");
});

//Create
critique.post("/", (req, res) => {
  if (req.body.hasWatched === "on") {
    req.body.hasWatched = true;
  } else {
    req.body.hasWatched = false;
  }
  res.send(req.body);
  //res.redirect('/critiques')
});

console.log("controller/review.js is linked");
module.exports = critique;
