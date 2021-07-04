const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const noteRoute = require("./controllers/NoteController");
require("dotenv").config();

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://" + MONGO_HOST + ":" + MONGO_PORT + "/noteAppBackend",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
