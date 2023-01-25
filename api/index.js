const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userauthRoute = require("./routes/auth-user");
const adminauthRoute = require("./routes/auth-admin");
const authorauthRoute = require("./routes/auth-author");

const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authorRoute = require("./routes/authors");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect("mongodb://127.0.0.1:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth-user", userauthRoute);
app.use("/api/auth-admin", adminauthRoute);
app.use("/api/auth-author", authorauthRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/authors", authorRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});