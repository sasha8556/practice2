let express = require("express");
const routes = require("./routes/index");


let app = express();

const port = 3000;

app.use(express.json());
app.use("/api", routes);


app.listen(port, () => console.log("Served started "));



