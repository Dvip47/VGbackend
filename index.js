const express = require("express");
const app = express();
require("./DB/connection");
const routes = require("./router/auth");
let PORT = 80 || process.env.PORT;
app.use(express.json());
app.use(routes);
//home
app.get("/", (req, res) => {
  return res.send("HI");
});
//404
app.get("*", (req, res) => {
  res.send("err0r 404");
});
app.listen(PORT, () => {
  console.log(` Connected at ${PORT}`);
});
