const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { rejects } = require("assert");

const data = "./data.json";
let users = [];

if (fs.existsSync(data)) {
  const dataUsers = fs.readFileSync("data.json", "utf8");
  const parsedUsers = JSON.parse(dataUsers);
  users.push(...parsedUsers);
}

class UserService {
  registerUser(info) {
    return new Promise(async (resolve, reject) => {
      try {
        const { username, email, password } = info;
        const existingUser = users.some((user) => user.email === email);
        if (existingUser) {
          reject("Пользователь с таким email уже существует");
          return;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = { username, email, password: hashedPassword };
        users.push(newUser);

        fs.writeFileSync("data.json", JSON.stringify(users, null, 2));

        // const token = jwt.sign({ userId: newUser._id }, "секретный_ключ", {
        //   expiresIn: "1h",
        // });
        resolve("Пользователь зарегистрирован");
      } catch (error) {
        reject("Ошибка регистрации пользователя");
      }
    });
  }

  loginUser(info) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = info;
        const user = users.find((user) => user.email === email);
        if (!user) {
          reject("Неверный email или пароль");
          return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          reject("Неверный email или пароль");
        }
        const token = jwt.sign({ userId: user._id }, "секретный_ключ", {
          expiresIn: "1h",
        });

        resolve({ token, userId: user._id });
      } catch (error) {
        console.error(error);
        reject("Ошибка входа в систему");
      }
    });
  }
}

module.exports = new UserService();
