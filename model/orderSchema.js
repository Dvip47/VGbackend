const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  companyName: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
  },
  productName: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  pMode: {
    type: String,
  },
});
const orderList = mongoose.model("order", orderSchema);
module.exports = orderList;
