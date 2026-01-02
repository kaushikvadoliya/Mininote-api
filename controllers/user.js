const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");
const nodemailer = require("nodemailer");

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.status(200).json("user is created");
};

const userLogout = (req, res) => {
  res.cookie("uid", "", {
    maxAge: 0,
  });
  return res.status(200).json("logged out");
};

const checkLogin = async (req, res) => {
  const token = req.cookies.uid;
  if (!token) {
    return res.status(401).json("token is expired");
  }
  return res.status(200).json("user is logged in");
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if (!user) {
    return res.status(401).json("Invalid username or password");
  }
  const token = setUser(user);
  res.cookie("uid", token, { maxAge: 24 * 60 * 60 * 1000 });
  return res.status(200).json("user is logged in");
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  if (otp !== req.cookies.otp) {
    return res.status(401).json("invalid otp");
  }
  return res.status(200).json("valid otp");
};

const sendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "kaushikvadoliya009@gmail.com",
        pass: "xojczrpopzsvdnec",
      },
    });

    const otp = Math.floor(1000 + Math.random() * 9000);

    await transporter.sendMail({
      from: "kaushikvadoliya009@gmail.com",
      to: email,
      subject: "Node js mail testing",
      text: "this is test email",
      html: `
      <div style="font-family: sans-serif; text-align: center;">
        <h2>Verify Your Email</h2>
        <p>Your 4-digit code is:</p>
        <h1 style="color: #007AFF; letter-spacing: 5px;">${otp}</h1>
        <p>This code expires in 10 minutes.</p>
      </div>
    `,
    });
    res.cookie("otp", otp, { maxAge: 1000 * 30 });
    return res.status(200).json("otp is send successfully");
  } catch (error) {
    return res.status(401).json("Email failed");
  }
};

const resetPassword = async (req, res) => {
  const { password, email } = req.body;
  await User.findOneAndUpdate(
    { email: email },
    { password: password },
    { new: true }
  );
  return res.status(200).json("password is update");
};

const userDetails = async (req, res) => {
  const token = req.cookies.uid;
  if (!token) {
    return res.status(401).json("token is expired");
  }
  const userId = getUser(token);
  const user = await User.findById(userId);
  return res.status(200).json({ message: "userDetails loaded", user: user });
};

module.exports = {
  userSignUp,
  userLogin,
  checkLogin,
  userLogout,
  sendEmail,
  verifyOtp,
  resetPassword,
  userDetails,
};
