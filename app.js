const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./DB/connection");
const path = require("path");
const routes = require("./router/auth");
app.use(express.json());
app.use(routes);
// app.use(express.static(path.join(__dirname,"")))
//home

//404
app.get("*", (req, res) => {
  res.send("err0r 404");
});

app.listen(8000, () => {
  console.log(` Connected at ${"http://localhost:8000"}`);
});
