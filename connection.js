const mongoose = require("mongoose");

async function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB is connected "))
    .catch((err) => console.log("connectoin is failed", err));
}
module.exports = connectMongoDb;
