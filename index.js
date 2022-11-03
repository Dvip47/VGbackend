const express = require("express");
var cors = require("cors");
const app = express();
require("./DB/connection");
const routes = require("./router/auth");
app.use(express.json());
app.use(routes);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  return res.send("Its running");
});

app.listen(process.env.PORT || 8000, () => {
  return console.log("Server started");
});
