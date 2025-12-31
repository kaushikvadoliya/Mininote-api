const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;

const setUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, key);
};

const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, key);
  } catch (error) {
    return null;
  }
};

module.exports = {
  setUser,
  getUser,
};
