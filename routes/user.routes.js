const express = require("express");
const router = express.Router();
const UserControllers = require("../controller/user.controller");
require('dotenv').config();
const jwt = require('jsonwebtoken');



router.post("/register", async (req, res) => {
  try {
    let newUser = await UserControllers.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка регистрации пользователя" });
  }
});

router.post("/login", async (req, res) => {
  try {
    let foundUser = await UserControllers.loginUser(req.body);
    res.status(200).json(foundUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка регистрации пользователя" });
  }
});

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) res.status(401).send('Unauthorized');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) next(new Error("invalid token"));
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(403).send('Forbidden');
  }
};

router.get("/", authenticateToken, async (req, res) => {
  try {
    const sections = await Section.findAll();
    res.json(sections);
  } catch (error) {
    res.json({ message: err });
  }
});

module.exports = router;
