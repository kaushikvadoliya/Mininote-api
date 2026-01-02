const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
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
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile-image",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}`,
  },
});

const upload = multer({ storage: storage });

router.route("/").get(getAllNotes).post(createNote);

router.delete("/delete-multiple", deleteMultipleNotes);

router.post("/upload-image", upload.single("file"), uploadIamge);

router
  .route("/:id")
  .delete(deletedNoteById)
  .patch(updateNoteByID)
  .get(getNoteById);

module.exports = router;
