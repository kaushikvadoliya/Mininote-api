const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  deletedNoteById,
  updateNoteByID,
  createNote,
  getNoteById,
  deleteMultipleNotes,
  uploadIamge,
} = require("../controllers/note");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage });

router.route("/").get(getAllNotes).post(createNote);

router.delete("/delete-multiple", deleteMultipleNotes);

router.post("/upload-image", upload.single("file"), uploadIamge);

router
  .route("/:id")
  .delete(deletedNoteById)
  .patch(updateNoteByID)
  .get(getNoteById);

module.exports = router;
