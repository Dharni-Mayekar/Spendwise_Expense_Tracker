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
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // 15 min

    await user.save();

    // Email Transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "SpendWise Password Reset",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password.</p>

        <a href="${resetURL}">
          Reset Password
        </a>

        <p>This link expires in 5 minutes.</p>
      `,
    });

    res.json({
      message: "Reset email sent successfully.",
    });

  } catch (error) {
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