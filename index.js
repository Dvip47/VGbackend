const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./DB/connection");
const path = require("path");
const routes = require("./router/auth");
let port = 8000 || process.env.PORT;
app.use(express.json());
app.use(routes);
// app.use(express.static(path.join(__dirname,"")))
//home

//404
app.get("/", (req, res) => {
  return res.send("HI");
});
app.get("*", (req, res) => {
  res.send("err0r 404");
});

app.listen(port, () => {
  console.log(` Connected at ${"http://localhost:8000"}`);
});
