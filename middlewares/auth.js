const { getUser } = require("../service/auth");

const restrictToLoggedinUserOnly = async (req, res, next) => {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.status(401).json("No session found");
  }
  const user = getUser(userUid);

  if (!user) {
    return res.status(401).json("Invalid user");
  }
  req.user = user;
  next();
};

module.exports = {
  restrictToLoggedinUserOnly,
};
