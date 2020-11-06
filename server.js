const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");

//CONFIGURATION
require("dotenv").config();

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
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection Successful")) //handles promise warnings
  .catch((err) => console.log(err));
mongoose.connection.once("open", () => {
  console.log("connected to mongoose!");
});

//mongod errors
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//open to connection with mongo
db.on("open", () => {});

//MIDDLEWARE
app.use(express.static(__dirname + "/public"));
// populates req.body with parsed info from forms -if no data from forms(empty object {})
app.use(express.urlencoded({ extended: false })); //doesn't allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON
app.use(methodOverride("_method"));
//session
app.use(
  session({
    // do not copy this value!
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//CONTROLLERS
//reviews
const critiqueController = require("./controllers/reviews.js");
app.use("/critiques", critiqueController);

//user
const userController = require("./controllers/users.js");
app.use("/users", userController);

const sessionController = require("./controllers/sessions.js");
app.use("/sessions", sessionController);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
