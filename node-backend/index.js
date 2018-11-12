var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
// var path = require("path");

var morgan = require("morgan");

var mongoose = require("mongoose");
mongoose.set("debug", true);

var mongo = require("mongodb");

var app = express();
app.set("view engine", "ejs");

//Import the established routes
const signupRoutes = require('./routes/signup')
const signinRoutes = require('./routes/signin')

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "MySession",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer.arguments(multerConfig));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

/****************************Code****************************************** */

app.post('/signup', signupRoutes)
app.post('/signin', signinRoutes)



app.listen(3001);
console.log("Server Listening on port 3001");