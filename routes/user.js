const express = require("express");
const {
  userSignUp,
  userLogin,
  checkLogin,
  userLogout,
  sendEmail,
  verifyOtp,
  resetPassword,
  userDetails,
} = require("../controllers/user");
const { verifyEmail } = require("../middlewares/verifyEmail");

const router = express.Router();

router.post("/", userSignUp);
router.post("/login", userLogin);
router.get("/check-login", checkLogin);
router.get("/logout", userLogout);
router.post("/send-email", verifyEmail, sendEmail);
router.post("/verify-otp", verifyOtp);
router.patch("/reset-password", resetPassword);
router.get("/user-details", userDetails);

module.exports = router;
