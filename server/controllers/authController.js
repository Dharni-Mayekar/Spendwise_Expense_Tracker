const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//register user

const registerUser = async (req, res) => {
try {
const {name, email, password } = req.body;

   //check existing user
const userExists = await User.findOne({email});
if (userExists) {
return res.status(400).json({
message: "User already exists",
});
}

//hash password
const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(password, salt);

//create user
const user = await User.create({
name, email, password: hashedPassword,
});

//generatee JWT token
const token = jwt.sign(
{ id: user._id },
process.env.JWT_SECRET,
{expiresIn: "7d",}
);

res.status(201).json({
_id: user._id,
name: user.name,
email: user.email,
token,
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

//login user
const loginUser = async (req, res) => {
try {
const{ email, password } = req.body;

//find user
const user = await User.findOne({ email });

if (!user) {
return res.status(400).json({
message: "Invalid credentials",
});
}

//compare password
const isMatch = await bcrypt.compare(
password,
user.password
);

if (!isMatch) {
return res.status(400).json({
message: "Invalid credentials",
});
}

//generate token
const token = jwt.sign(
{id: user._id },
process.env.JWT_SECRET,
{
expiresIn: "7d",
}
);

res.status(200).json({
_id: user._id,
name: user.name,
email: user.email,
token,
});

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

const forgotPassword = async (req, res) => {
  try {
    console.log("1. Forgot password started");

    const { email } = req.body;
    console.log("2. Email:", email);

    const user = await User.findOne({ email });
    console.log("3. User found:", !!user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("4. Token generated");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

    await user.save();
    console.log("5. User saved");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("6. Transporter created");

const resetURL =
  process.env.NODE_ENV === "production"
    ? `https://spendwise-expense-tracker-wine.vercel.app/reset-password/${resetToken}`
    : `http://localhost:5173/reset-password/${resetToken}`;
    console.log("7. Sending mail...");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "SpendWise Password Reset",
      html: `
        <h2>Password Reset</h2>
        <a href="${resetURL}">Reset Password</a>
      `,
    });

    console.log("8. Mail sent");

    res.json({
      message: "Reset email sent successfully.",
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
registerUser,
loginUser,
forgotPassword,
};