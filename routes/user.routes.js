const express = require("express");
const router = express.Router();
const UserControllers = require("../controller/user.controller");

router.post("/register", async (req, res) => {
  try {
    let newUser = await UserControllers.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка регистрации пользователя" });
  }
});

module.exports = router;
