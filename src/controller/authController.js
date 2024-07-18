// const UserModel = require("./../model/UserModel")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt");

// //handle errors
// const handleErrors = (err) => {
//     console.log("Error message: ", err.message, "Error code: ", err.code)
//     let errors = { name: "", email: "", password: "" }

//     //incorrect email
//     if (err.message === "Incorrect Email") {
//         errors.email = "Email is not registered"
//     }
//     //incorrect password
//     if (err.message === "Incorrect Password") {
//       errors.password = "Password does not match";
//     }


//     if (err.code === 11000) {
//         //duplicate error
//         errors.email = "The email is already registered";
//         return errors;
//     }
    
//     //validation error
//     if (err.message.includes("users validation failed")) {
//         Object.values(err.errors).forEach(({ properties }) => {
//             errors[properties.path]= properties.message
//         })
//     }
// return errors;
// }

// //creating token
// const maxAge = 3 * 24 * 60 * 60
// const createToken = (id) => {
//     try {
//         const token = jwt.sign({ id }, "rtk commerce secret", {
//           expiresIn: maxAge,
//         });
//         console.log("Token created: ", token)
//         return token
//     } catch (error) {
//         console.log("Error with create token")
//         throw error
//     }
// }


// module.exports.signup_get = (req, res) => {
//   res.status(200).json({ Status: "Success", Page: "Sign up" });
// }
// module.exports.login_get = (req, res) => {
//   res.status(200).json({ Status: "Success", Page: "Log In" });
// }
// module.exports.signup_post = async(req, res) => {
//     const { name, email, password } = req.body
//     try {
//         const createUser = await UserModel.create({ name, email, password })
//         const token = createToken(createUser._id)
//         console.log("Setting cookie with token:", token);
//         res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000 }  )
//         res.status(201).json({ user: createUser._id, name })
//         console.log("The new user is: ", name);
//     } catch (error) {
//         const errors = handleErrors(error);
//         res.status(400).json({ errors })
//         console.log("sign up error is: ", error);
//     }
// }
// module.exports.login_post = async(req, res) => {
//     const { email, password } = req.body
//     try {
//         const user = await UserModel.login(email, password)
//         const token = createToken(user._id);
//         res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
//         res.status(200).json({ user: user._id });
//     } catch (err) {
//         const errors = handleErrors(err)
//         res.status(400).json({errors})
//     }
// }







const UserModel = require("./../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Handle errors
const handleErrors = (err) => {
  console.log("Error message:", err.message, "Error code:", err.code);
  let errors = { name: "", email: "", password: "" };

  // Incorrect email
  if (err.message === "Incorrect Email") {
    errors.email = "Email is not registered";
  }
  // Incorrect password
  if (err.message === "Incorrect Password") {
    errors.password = "Password does not match";
  }

  if (err.code === 11000) {
    // Duplicate error
    errors.email = "The email is already registered";
    return errors;
  }

  // Validation error
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// Create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  try {
    const token = jwt.sign({ id }, "rtk commerce secret", {
      expiresIn: maxAge,
    });
    console.log("Token created:", token);
    return token;
  } catch (error) {
    console.log("Error with create token");
    throw error;
  }
};

module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const createUser = await UserModel.create({ name, email, password });
    const token = createToken(createUser._id);
    console.log("Setting cookie with token:", token);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        // expiresIn: "1d",
        maxAge: maxAge * 1000,
      })
      .status(201)
      .json({ user: createUser._id, name });
    console.log("The new user is:", name);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
    console.log("Sign up error is:", error);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      })
      .status(200)
      .json({ user: user._id, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get =async (req, res) => {
  res
    .cookie("jwt", "", { maxAge: 1 })
    .status(200)
    .json({ message: "Logged out successfully" });
}