const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  noteTitle: { type: String, required: true },
  noteDesc: { type: String, required: true },
  userID: { type: String, required: true },
});

module.exports = mongoose.model("Note", noteSchema);
