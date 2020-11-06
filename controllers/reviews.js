const express = require("express");
const Review = require("../models/reviews.js");

const critique = express.Router();

//MIDDLEWARE
// if user credentials match then "next" go to the pages/routes your going to already, otherwise go back to the login page, wow!
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

//ROUTES

//new
critique.get("/new", isAuthenticated, (req, res) => {
  res.render("new.ejs", { currentUser: req.session.currentUser });
});

//Create
critique.post("/", isAuthenticated, (req, res) => {
  Review.create(
    // copy of req.body and add userId
    {
      title: req.body.title,
      entry: req.body.entry,
      rating: req.body.rating,
      img: req.body.img,
      userId: req.session.currentUser._id,
    },
    (error, createdCritique) => {
      res.redirect("/critiques");
    }
  );
});

//index
critique.get("/", isAuthenticated, (req, res) => {
  Review.find(
    //all  that have that userId
    { userId: req.session.currentUser._id },
    (error, allCritiques) => {
      res.render("index.ejs", {
        critique: allCritiques,
        currentUser: req.session.currentUser,
      });
    }
  );
});

//edit
critique.get("/:id/edit", isAuthenticated, (req, res) => {
  Review.findOne(
    { _id: req.params.id, userId: req.session.currentUser._id },
    (error, foundCritique) => {
      res.render("edit.ejs", {
        critique: foundCritique,
        currentUser: req.session.currentUser,
      });
    }
  );
});

//update
critique.put("/:id", isAuthenticated, (req, res) => {
  Review.findOneAndUpdate(
    //matches userId and critique _id
    { _id: req.params.id, userId: req.session.currentUser._id },
    {
      title: req.body.title,
      entry: req.body.entry,
      rating: req.body.rating,
      img: req.body.img,
      userId: req.session.currentUser._id,
    },
    { new: true },
    (error, updateCritique) => {
      res.redirect(`/critiques/${req.params.id}`);
    }
  );
});

//seed
critique.get("/seed", isAuthenticated, async (req, res) => {
  const seedImage = [
    {
      title: "Fifth Element",
      entry:
        "An ancient alien species is in charge of protecting earth, but are destroyed before they can...except for one. This is an action packed comedy, typical Bruce Willis style film with a touch of romance. ",
      rating: 5,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQuXJdaVQYCMUnTf-0YsMS00IT39lBDkb4CA&usqp=CAU",
      userId: req.session.currentUser._id,
    },
    {
      title: "Face Off",
      entry:
        "This movie is the worst and the best, John Travolta and Nicolas Cage literally switch faces and lives. Watch with your friends as these two actors lose their freaking minds. ",
      rating: 3,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ20W5H06mwUOwuvIciliClksGx8r7neezvzw&usqp=CAU",
      userId: req.session.currentUser._id,
    },
    {
      title: "Buffy The Vampire Slayer",
      entry:
        "A young woman is chosen to fight demons and save the world. Over and over again. You'll cry, you'll laugh, and scream, with Buffy and all her friends in this horror Horror-Dramedy made for all audiences.",
      rating: 5,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRg0Z4powVBDQ3DFGARsOQC_J6OcKquWi7suw&usqp=CAU",
      userId: req.session.currentUser._id,
    },
    {
      title: "Tucker and Dale VS Evil",
      entry:
        "Hilarious satire on the teen horror movie genre and hill-billy stereotype.",
      rating: 5,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQD8pllsf06LUmPDz2qV1mVdk3NVgXNCiAyqQ&usqp=CAU",
      userId: req.session.currentUser._id,
    },
    {
      title: "Star Trek: The Next Generation",
      entry:
        "An amazingly in-depth look at human nature and life's most difficult philosophical questions. Get ready to have an existential crises with Star Trek: The Next Generation's lovable cast and crew as they explore the Galaxy.",
      rating: 5,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6IsxwnCMnbZ6wDMElcOu1TqTYmPbrGJsoHg&usqp=CAU",
      userId: req.session.currentUser._id,
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
critique.get("/:id", isAuthenticated, (req, res) => {
  Review.findOne(
    // searching for both ids, first object with both ids
    { _id: req.params.id, userId: req.session.currentUser._id },
    (error, foundCritique) => {
      res.render("show.ejs", {
        critique: foundCritique,
        currentUser: req.session.currentUser,
      });
    }
  );
});

//delete
critique.delete("/:id", isAuthenticated, (req, res) => {
  Review.findByIdAndRemove(
    //condition and callback
    // userId prevents someone from deleting my tellycritic details, 
    { _id: req.params.id, userId: req.session.currentUser._id },
    (error, foundCritique) => {
      res.redirect("/critiques");
    }
  );
});

console.log("controller/review.js is linked");
module.exports = critique;
