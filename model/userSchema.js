const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
  },
  pass: {
    type: String,
  },
  cpass: {
    type: String,
  },
  role: String,
});

const userList = mongoose.model("user", userSchema);
module.exports = userList;
