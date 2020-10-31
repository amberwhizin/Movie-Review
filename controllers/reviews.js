const express = require("express");
const Review = require("../models/reviews.js");


const critique = express.Router();

//ROUTES

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
  Review.create(req.body, (error, createdCritique) => {
    res.redirect("/critiques");
  });
});

//index
critique.get("/", (req, res) => {
  Review.find({}, (error, allCritiques) => {
    res.render("index.ejs", {
      critique: allCritiques,
    });
  });
});

//edit
critique.get("/:id/edit", (req, res) => {
  Review.findById(req.params.id, (error, foundCritique) => {
    res.render("edit.ejs", {
      critique: foundCritique,
    });
  });
});

//update
critique.put("/:id", (req, res) => {
  Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updateCritique) => {
      console.log(updateCritique);
      res.redirect("/critiques");
    }
  );
});

//seed
//error: E11000 duplicate key error collection: telly-critic.reviews index:showtitle_1 dup key: { showtitle: null } - but I  deleted showtitle....

// critique.get("/seed", async (req, res) => {
//   const newImage = [
//     {
//       title: "face off",
//       entry: "this movie is the worst and the best",
//       rating: 5,
//       img:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQuXJdaVQYCMUnTf-0YsMS00IT39lBDkb4CA&usqp=CAU",
//       hasWatched: true,
//     },
//   ];
//   try {
//     const seedItems = await Review.create(newImage);
//     res.send(seedItems);
//   } catch (err) {
//     res.send(err.message);
//   }
// });

//show
critique.get("/:id", (req, res) => {
  Review.findById(req.params.id, (error, foundCritique) => {
    console.log({ foundCritique }, req.params.id);
    res.render("show.ejs", {
      critique: foundCritique,
    });
  });
});

//delete
critique.delete("/:id", (req, res) => {
  Review.findByIdAndRemove(req.params.id, (error, foundCritique) => {
    res.redirect("/critiques");
  });
});

console.log("controller/review.js is linked");
module.exports = critique;
