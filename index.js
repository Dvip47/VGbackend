const express = require("express");
var cors = require("cors");
const app = express();
require("./DB/connection");
const routes = require("./router/auth");
app.use(express.json());
app.use(routes);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS"
  ),
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use;
cors({
  credentials: true,
  origin: "http://localhost:3000/",
  optionsSuccessStatus: 200,
}),
  app.get("/", (req, res) => {
    return res.send("Its running dev");
  });

app.listen(process.env.PORT || 8000, () => {
  return console.log("Server started");
});
