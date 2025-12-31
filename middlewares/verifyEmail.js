const User = require("../models/user");

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(401).json("Invalid Email");
  }
  next();
};

module.exports = { verifyEmail };
