const router = require("express").Router();
const Author = require("../models/Author");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE AUTHOR
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedAuthor);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE AUTHOR
router.delete("/:id", async (req, res) => {
  if (req.body.authorId === req.params.id) {
    try {
      const author = await Author.findById(req.params.id);
      try {
        await Post.deleteMany({ username: author.username });
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json("Author has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("Author not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET AUTHOR
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const { password, ...others } = author._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;