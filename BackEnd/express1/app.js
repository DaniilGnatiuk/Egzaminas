var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const eventsRouter = require("./routes/events");
const categoriesRouter = require("./routes/category");
const ratingsRouter = require("./routes/ratings");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/events", eventsRouter);
app.use("/categories", categoriesRouter);
app.use("/ratings", ratingsRouter);
app.use("/uploads", express.static("uploads"));

module.exports = app;
