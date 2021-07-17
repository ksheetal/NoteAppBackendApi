const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const noteRoute = require("./controllers/NoteController");
require("dotenv").config();

const MONGO_HOST = "mongo";
const MONGO_PORT = "27017";

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://mongo:27017/noteAppBackend", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use(cors);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Handing all incoming requrest for Note
app.use("/note", noteRoute);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 400;
  next(error);
});

// Error handling.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
