const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Token from middleware:", token);
  if (token) {
    jwt.verify(token, "rtk commerce secret", (err, decodedToken) => {
      if (err) {
        console.log("Token verification error:", err.message);
      } else {
        console.log("The decoded token is:", decodedToken);
        next();
      }
    });
  } else {
    console.log("No token found");
  }
};
module.exports = { requireAuth };