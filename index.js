const express = require("express");
var cors = require("cors");
const app = express();
require("./DB/connection");
const routes = require("./router/auth");
app.use(express.json());
app.use(routes);
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Its running");
});

app.listen(process.env.PORT || 8000, () => {
  return console.log("Server started");
});

// const express = require("express");
// const app = express();
// require("./DB/connection");
// const routes = require("./router/auth");
// let PORT = 80 || process.env.PORT;
// app.use(express.json());
// app.use(routes);
// app.get("/", (req, res) => {
//   return res.send("HI");
// });
// //home
// //404
// app.get("*", (req, res) => {
//   res.send("err0r 404");
// });
// app.listen(PORT, () => {
//   console.log(` Connected at ${PORT}`);
// });
