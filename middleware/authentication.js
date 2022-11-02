const { sign, verify } = require("jsonwebtoken");

// setting token
async function setToken(data) {
  const token = sign({ data }, "sndfvjnsdjkvgnsksfdsdfsdfgsdgdfghwerh", {
    expiresIn: "1d",
  });
  return token;
}

// validating token
async function getToken(req, res, next) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    verify(token, "sndfvjnsdjkvgnsksfdsdfsdfgsdgdfghwerh", function (err) {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token expired", success: false, token: null });
      } else {
        next();
      }
    });
  } else {
    return res.json({
      message: "Token not found",
      success: false,
      token: null,
    });
  }
}
module.exports = {
  getToken,
  setToken,
};
