const mongoose = require("mongoose");
const DB =
  "mongodb+srv://VishwakarmaGroup:12345@cluster0.lpugdcu.mongodb.net/VishwakarmaGroup?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful to DB");
  })
  .catch((err) => {
    console.log("Not connected to DB");
  });
