const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  deletedNoteById,
  updateNoteByID,
  createNote,
  getNoteById,
  deleteMultipleNotes,
} = require("../controllers/note");

router.route("/").get(getAllNotes).post(createNote);

router.delete("/delete-multiple", deleteMultipleNotes);

router
  .route("/:id")
  .delete(deletedNoteById)
  .patch(updateNoteByID)
  .get(getNoteById);

module.exports = router;
