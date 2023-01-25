const router = require("express").Router();
const Author = require("../models/Author");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/authorregister", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newAuthor = new Author({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const author = await newAuthor.save();
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/authorlogin", async (req, res) => {
  try {
    const author = await Author.findOne({ username: req.body.username });
    !author && res.status(400).json("Wrong credentials!");
  

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = author._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  
  }
});

module.exports = router;