const Note = require("../model/noteModel");
const mongoose = require("mongoose");

function addNote(req, res) {
  if (req.body.noteTitle != undefined || req.body.noteTitle != undefined) {
    const note = new Note({
      _id: new mongoose.Types.ObjectId(),
      noteTitle: req.body.noteTitle,
      noteDesc: req.body.noteDesc,
    });
    note
      .save()
      .then((result) => {
        return res.status(200).json({
          message: "Note Added Successfully",
          createdNote: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: err,
        });
      });
  } else {
    return res.status(400).json({
      message: "Invalide Data",
    });
  }
}

function getNoteById(req, res) {
  Note.findById(req.params.noteId)
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error",
      });
    });
}

function getAllNotes(req, res) {
  Note.find()
    .select("noteTitle noteDesc _id")
    .exec()
    .then((result) => {
      return res.status(200).json({
        size: result.length,
        notes: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error",
      });
    });
}

function deleteNote(req, res) {
  const noteId = req.params.noteId;
  Note.remove({ _id: noteId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error",
      });
    });
}
function updateNote(req, res) {
  const noteId = req.params.noteId;
  Note.findByIdAndUpdate(noteId, { $set: req.body }, { new: true })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));
}
module.exports = {
  addNote,
  getNoteById,
  getAllNotes,
  deleteNote,
  updateNote,
};
