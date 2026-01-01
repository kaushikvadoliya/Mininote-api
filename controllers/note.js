const multer = require("multer");
const Note = require("../models/note");

const getAllNotes = async (req, res) => {
  const currentUser = req.user._id;
  const notes = await Note.find({ createdBy: currentUser });
  return res.send(notes);
};

const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    return res.json(note);
  } else {
    return res.status(404).json("id is not found");
  }
};

const deleteMultipleNotes = async (req, res) => {
  const { ids } = req.body;
  if (!ids || ids.length === 0) {
    return res.status(400).json("No multiple ids selected");
  }
  await Note.deleteMany({
    _id: { $in: ids },
  });

  res.status(200).json("Deleted successfully");
};

const createNote = async (req, res) => {
  const { title, text } = req.body;
  if (!text || !title) {
    return res.status(400).json("Bad Request");
  }
  await Note.create({
    title: title,
    text: text,
    createdBy: req.user._id,
  });
  return res.status(201).json("successfully create");
};

const deletedNoteById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json("Failed to delete");
  }
  await Note.findByIdAndDelete(id);
  return res.status(200).json("Note deleted");
};

const updateNoteByID = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (!id) {
    return res.status(404).json("Note not found");
  }
  await Note.findByIdAndUpdate(id, {
    title: body.title,
    text: body.text,
  });

  return res.status(200).json("Note updated");
};

const uploadIamge = async (req, res) => {
  console.log("request file is ", req.file);
  return res.json("formData is uploaded");
};

module.exports = {
  getAllNotes,
  createNote,
  deletedNoteById,
  updateNoteByID,
  getNoteById,
  deleteMultipleNotes,
  uploadIamge,
};
