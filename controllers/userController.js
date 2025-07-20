const {
  generateToken,
  hashPassword,
  comparePasswords,
} = require("../utils/jwt");
const { validationResult } = require("express-validator");
const pool = require("../models/db");
const { createUser, getUserById } = require("../models/userModel");

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  // Strong password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    });
  }

  try {
    // Check if user already exists
    const usersResult = await pool.query(
      "SELECT * FROM users WHERE name = $1 OR email = $2",
      [name, email]
    );
    const users = usersResult.rows;

    if (users.length > 0) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const rows = await createUser({ name, email, password: hashedPassword });
    const token = generateToken(rows.id);

    // adeed
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Signup successful",
      user: { id: rows.id, name, email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user.");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { rows } = await pool.query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [email]
    );

    if (!rows.length) {
      return res.status(400).json({ message: "User does not exist! Sign up" });
    }

    const user = rows[0];

    const isValidPassword = await comparePasswords(password, rows[0].password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error logging in." });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out" });
}

exports.getMe = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const jwt = require("jsonwebtoken");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ user: { id: decoded.id } });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
