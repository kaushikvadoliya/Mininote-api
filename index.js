const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const userRouter = require("./routes/user");
const connectMongoDb = require("./connection");
const noteRouter = require("./routes/note");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");

connectMongoDb(process.env.MONGODB_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);

app.use("/api/notes", restrictToLoggedinUserOnly, noteRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
