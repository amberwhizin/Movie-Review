const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TellyReview = new Schema({
  title: { type: String, required: true },
  entry: String,
  rating: { type: Number, min: 0, max: 5, default: 0, required: true },
  img: String,
  userId: { type: Schema.ObjectId, ref: "User", required: true },
});

const Review = mongoose.model("review", TellyReview); // Check this

module.exports = Review;
