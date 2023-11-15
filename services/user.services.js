const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const data = "./data.json";
let users = [];

if (fs.existsSync(data)) {
  const dataUsers = fs.readFileSync("data.json", "utf8");
  users = JSON.parse(dataUsers);
}

class UserService {
    registerUser(info) {
      return new Promise(async (resolve, reject) => {
        try {
          const { username, email, password } = info;
          const existingUser = users.some((user) => user.email === email);
          if (existingUser) {
            reject("Пользователь с таким email уже существует");
          }
  
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
  
          const newUser = { username, email, password: hashedPassword };
          users.push(newUser);
  
          fs.writeFileSync("data.json", JSON.stringify(users, null, 2));
  
          const token = jwt.sign({ userId: newUser._id }, "секретный_ключ", {
            expiresIn: "1h",
          });
          console.log(users);
          resolve({ token, userId: newUser._id });
        } catch (error) {
          reject("Ошибка регистрации пользователя");
        }
      });
    }
  }
  


module.exports = new UserService();