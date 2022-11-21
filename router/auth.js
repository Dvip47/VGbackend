const express = require("express");
const router = express.Router();
require("../DB/connection");
const Product = require("../model/productSchema");
const User = require("../model/userSchema");
const Order = require("../model/orderSchema");
const { setToken, getToken } = require("../middleware/authentication");
const Razorpay = require("razorpay");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// add Product
router.post("/addProduct", upload.single("src"), async (req, res) => {
  const { id, category, src, title, description, Price, discount } = req.body;
  if (!id || !title || !src || !Price || !description || !category) {
    return res.status(442).json({ error: "Check all required feild" });
  }
  try {
    const productExist = await Product.findOne({ description: description });
    if (productExist) {
      return res.status(442).json({ error: "Product already exist" });
    }
    const product = new Product({
      id,
      category,
      src,
      title,
      description,
      Price,
      discount,
    });
    let x = await product.save();

    return res.status(201).json({ message: "Product Added Successfulll" });
  } catch (err) {
    console.log(err);
  }
});

// registation

router.post("/registation", async (req, res) => {
  const { name, mobile, email, pass, cpass } = req.body;
  if (!name || !email || !mobile || !pass || !cpass) {
    return res.status(422).json({ error: " Check all require feild" });
  }
  try {
    const userExist = await User.findOne({ mobile: mobile });
    if (userExist?.mobile) {
      console.log("user already exist");
      return res.status(422).json({ message: "user already exist" });
    }
    const user = new User({
      name,
      email,
      mobile,
      pass,
      cpass,
      role: "admin",
    });
    await user.save();
    // console.log(x);
    return res.status(201).json({ message: "registation successfully" });
  } catch (err) {
    console.log(err);
  }
});

// login
router.post("/signin", async (req, res) => {
  try {
    const { email, pass } = req.body;
    if (!email || !pass) {
      return res.status(400).json({ error: "Fill All Feilds" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      if (pass !== userLogin.pass) {
        res.status(400).json({ message: "Invalid Password" });
      }
      let token = await setToken(userLogin);
      res.json({ message: "user Sign in successfully", token });
    } else {
      res.status(400).json({ message: "Invalid email", message: data });
    }
  } catch (err) {
    console.log(err);
  }
});

//admin
router.get("/order", async (req, res) => {
  let data = await Order.find({});
  return res.status(200).json({ success: true, message: data });
});

//user
router.get("/user", async (req, res) => {
  let data = await User.find({});
  return res.status(200).json({ success: true, message: data });
});
// update user
router.get("/updateUser:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    let result = await Order.updateOne({ _id: _id });
    return res
      .status(200)
      .json({ success: true, message: "Profile update successfully" });
  } catch (error) {
    console.log(error);
  }
});

//product
router.get("/product", async (req, res) => {
  let data = await Product.find({});
  return res.status(200).json({ success: true, message: data });
});

//sofalist
router.get("/sofa", async (req, res) => {
  let data = await Product.find({ category: "Sofa" });
  return res.status(200).json({ success: true, message: data });
});

//doorList
router.get("/door", async (req, res) => {
  let data = await Product.find({ category: "Door" });
  return res.status(200).json({ success: true, message: data });
});

//user delete
router.get("/deleteUser:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    let result = await User.deleteOne({ _id: _id });
    console.log(result);
    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.log(error);
  }
});
//product delete
router.get("/deleteProduct:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    let result = await Product.deleteOne({ _id: _id });
    console.log(result);
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(error);
  }
});
//order delete
router.get("/deleteOrder:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    let result = await Order.deleteOne({ _id: _id });
    console.log(result);
    return res
      .status(200)
      .json({ success: true, message: "Order Delevered successfully" });
  } catch (error) {
    console.log(error);
  }
});

//order

router.post("/order", async (req, res) => {
  const {
    fname,
    lname,
    companyName,
    street,
    city,
    state,
    pinCode,
    mobile,
    email,
    productName,
    quantity,
    price,
  } = req.body;

  if (
    !fname ||
    !lname ||
    !street ||
    !city ||
    !state ||
    !pinCode ||
    !mobile ||
    !email ||
    !productName ||
    !quantity ||
    !price
  ) {
    return res.status(400).json({ error: "Check All Required Feild" });
  }
  try {
    const order = new Order({
      fname,
      lname,
      companyName,
      street,
      city,
      state,
      pinCode,
      mobile,
      email,
      productName,
      quantity,
      price,
    });
    await order.save();
    // console.log(x);
    return res.status(200).json({ message: "Order Placed" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/paymentgateway", (req, res) => {
  let price = req.body.amount * 100;
  price = parseFloat(price);
  var instance = new Razorpay({
    key_id: "rzp_test_kEwvmdkDDfOIUP",
    key_secret: "SeggPSrmrG1q1cc7yNC9BOOV",
  });
  var options = {
    amount: price, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: 1,
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.send(err);
    } else {
      return res.json(order);
    }
  });
});

router.post("/payment", (req, res) => {
  const generated_signature = crypto.createHmac(
    "sha256",
    "rzp_live_y6fSdCH9fLpdbx"
  );
  generated_signature.update(
    req.body.razorpay_order_id + "|" + req.body.transactionid
  );
  if (generated_signature.digest("hex") === req.body.razorpay_signature) {
    const transaction = new Transaction({
      transactionid: req.body.transactionid,
      transactionamount: req.body.transactionamount,
    });
    transaction.save(function (err, savedtransac) {
      if (err) {
        console.log(err);
        return res.status(500).send("Some Problem Occured");
      }
      res.send({ transaction: savedtransac });
    });
  } else {
    return res.send("failed");
  }
});
// payment gateway setup over

module.exports = router;
