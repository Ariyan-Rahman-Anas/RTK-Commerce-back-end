// const jwt = require("jsonwebtoken")

// const requireAuth = (req, res, next) => {
//     const token = req?.cookies?.jwt
//     console.log("tok tok:::::", token)
//     //check token token and verified or not
//     if (token) {
//         jwt.verify(token, "rtk commerce secret", (err, decodedToken) => {
//             if (err) {
//                 console.log("error from token verify: ", err.message);
//                 res.redirect("/log-in");
//             } else {
//                 console.log("The decoded token is: ", decodedToken)
//                 next();
//             }
//         } );
//     } else {
//         console.log("No token found");
//         res.redirect("/log-in")
//     }
// }
// module.exports ={requireAuth}


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