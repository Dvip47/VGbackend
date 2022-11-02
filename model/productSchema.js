const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    // require: true,
  },
  src: {
    type: String,
    // require: true,
  },

  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  Price: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
  },
});

const productList = mongoose.model("product", productSchema);
module.exports = productList;
