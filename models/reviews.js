const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TellyReview = new Schema({
  title: { type: String, unique: true, required: true },
  entry: String,
  rating: { type: Number, min: 0, max: 5, default: 0, required: true },
  img: String, //[]?
  hasWatched: {type: Boolean},
});

const Review = mongoose.model("review", TellyReview); // uh-oh, review, isn't capitalized...

module.exports = Review;
 