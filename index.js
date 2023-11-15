let express = require("express");
const routes = require("./routes/index");


let app = express();

const port = 3000;

app.use("/api", routes);


app.listen(port, () => console.log("Served started "));


// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

// console.log(users);
//     const user = users.find((user) => user.email === email);
//     if (!user) {
//       return res.status(401).json({ message: "Неверный email или пароль" });
//     }


//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Неверный email или пароль" });
//     }

//     // Создание JWT-токена для авторизации
//     const token = jwt.sign({ userId: user._id }, "секретный_ключ", { expiresIn: "1h" });

//     res.json({ token, userId: user._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Ошибка входа в систему" });
//   }
// });
