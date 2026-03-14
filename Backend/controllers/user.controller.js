const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      message: "User registered successfully",
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "User login successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const logoutUser = (req, res) => {
  res.cookie("token", "", {});
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
