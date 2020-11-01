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
  // if (req.body.hasWatched === "on") {
  //   req.body.hasWatched = true;
  // } else {
  //   req.body.hasWatched = false;
  // }
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
      res.redirect(`/critiques/${req.params.id}`);
    }
  );
});

//seed
critique.get("/seed", async (req, res) => {
  const seedImage = [
    {
      title: "Fifth Element",
      entry: "An ancient alien species is in charge of protecting earth, but are destroyed before they can...except for one. This is an action packed comedy, typical Bruce Willis style film with a touch of romance. ",
      rating: 5,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQuXJdaVQYCMUnTf-0YsMS00IT39lBDkb4CA&usqp=CAU",
      hasWatched: true,
    },
    {
      title: "Face Off",
      entry: "This movie is the worst and the best, John Travolta and Nicolas Cage literally switch faces and lives. Watch with your friends as these two actors lose their freaking minds. ",
      rating: 3,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ20W5H06mwUOwuvIciliClksGx8r7neezvzw&usqp=CAU",
      hasWatched: true,
    },
    {
      title: "Buffy The Vampire Slayer",
      entry: "A young woman is chosen to fight demons and save the world. Over and over again. You'll cry, you'll laugh, and scream, with Buffy and all her friends in this horror Horror-Dramedy made for all audiences.",
      rating: 5,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRg0Z4powVBDQ3DFGARsOQC_J6OcKquWi7suw&usqp=CAU",
      hasWatched: true,
    },
    {
      title: "Tucker and Dale VS Evil",
      entry: "Hilarious satire on the teen horror movie genre and hill-billy stereotype.",
      rating: 5,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQD8pllsf06LUmPDz2qV1mVdk3NVgXNCiAyqQ&usqp=CAU",
      hasWatched: true,
    },
    {
      title: "Star Trek: The Next Generation",
      entry: "An amazingly in-depth look at human nature and life's most difficult philosophical questions. Get ready to have an existential crises with Star Trek: The Next Generation's lovable cast and crew as they explore the Galaxy.",
      rating: 5,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6IsxwnCMnbZ6wDMElcOu1TqTYmPbrGJsoHg&usqp=CAU",
      hasWatched: true,
    },
  ];
  try {
    const seedItems = await Review.create(seedImage);
    res.send(seedItems);
  } catch (err) {
    res.send(err.message);
  }
});

//show
critique.get("/:id", (req, res) => {
  Review.findById(req.params.id, (error, foundCritique) => {
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
