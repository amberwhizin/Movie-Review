const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;

//PORT
// use of Heroku's port or local
const PORT = process.env.PORT || 3000;

//DATABASE
// connect to database via heroku or local
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/" + `telly-critic`;

//connect to mongo
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//errors
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//open to connection with mongo
db.on("open", () => {});

//MIDDLEWARE
app.use(express.static("public"));

// populates req.body with parsed info from forms - if no data from forms -empty object {}
app.use(express.urlencoded({ extended: false })); //doesn't allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON

app.use(methodOverride("_method"));

//ROUTES
//test localhost
app.get("/telly-critic", (req, res) => {
  console.log("hi");
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
