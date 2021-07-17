const express = require("express");
const router = express.Router();
const Note = require("../model/noteModel");
const mongoose = require("mongoose");
const noteService = require("../services/NoteService");

router.get("/getAllNotes", (req, res, next) => {
  noteService.getAllNotes(req, res);
});

router.get("/addFakeNote", (req, res, next) => {
  console.log("inside add fake note");
  noteService.addFakeNote(req, res);
});
router.post("/AddNote", (req, res, next) => {
  noteService.addNote(req, res);
});

router.delete("/deleteNote/:noteId", (req, res, next) => {
  const noteID = req.params.noteId;
  noteService.deleteNote(req, res);
});

router.patch("/updateNote/:noteId", (req, res, next) => {
  const noteID = req.params.noteId;
  noteService.updateNote(req, res);
});

router.get("/getANote/:noteId", (req, res, next) => {
  const noteID = req.params.noteId;
  noteService.getNoteById(req, res);
});

module.exports = router;
