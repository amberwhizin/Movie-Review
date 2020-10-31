const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TellyReview = new Schema({
  title: { type: String, unique: true, required: true },
  entry: String,
  rating: { type: Number, min: 0, max: 5 },
  img: String, //[]
  hasWatched: Boolean,
});

const Review = mongoose.model("review", TellyReview);

module.exports = Review;
