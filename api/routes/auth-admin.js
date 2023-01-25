const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/adminregister", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newAdmin = new Admin({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const admin = await newAdmin.save();
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/adminlogin", async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    !admin && res.status(400).json("Wrong credentials!");
  

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = admin._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  
  }
});

module.exports = router;