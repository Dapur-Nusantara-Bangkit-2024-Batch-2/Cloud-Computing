const express = require("express");
const supabaseClient = require("../model/supabase.js");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (password.toString().length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters", error: true });
  }
  const { data: user, error: userError } = await supabaseClient.from("User").select().eq("User.email", email);
  console.log(user);
  if (user) {
    return res.status(400).json({ message: "User with same email was found, please consider using another email account !", error: true });
  }

  const cryptedPass = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

  const { error } = await supabaseClient.from("User").insert({ name, password: cryptedPass, email });
  if (error) {
    return res.status(500).json({ error: true, message: error });
  }

  return res.status(200).json({ message: "User succesfully created", error: false });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data: user, error } = await supabaseClient.from("User").select().eq("email", email);
  console.log(user);
  if (error || !user || user.length === 0) {
    return res.status(404).json({ error: true, message: "User not found" });
  }
  if (user) {
    const crypt = bcryptjs.compareSync(password, user[0].password);
    if (!crypt) {
      return res.status(400).json({ error: true, message: "Wrong credentials" });
    }
  }
  const token = jwt.sign({ name: user[0].name, id: user[0].id, email: user[0].email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

  return res.status(200).json({
    message: "User successfully logged in",
    error: false,
    loginResult: {
      token,
      userId: user[0].id,
      name: user[0].name,
    },
  });
});

module.exports = router;
