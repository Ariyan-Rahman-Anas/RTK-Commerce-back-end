const mongoose = require("mongoose")
const { isEmail} = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      minlength: [3, "Name length must be minimum 3 characters"],
      maxlength: [32, "Name length must be maximum 32 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter an email"],
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password length must be minimum 6 characters"],
    },
  },
  { timestamps: true, versionKey: false }
);

//hashing password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt);
  next()
})

//static method for login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }throw Error("Incorrect Password")
  }throw Error("Incorrect Email")
}

const userModel = new mongoose.model("users", userSchema)
module.exports = userModel;