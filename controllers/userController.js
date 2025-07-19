const {
  generateToken,
  hashPassword,
  comparePasswords,
} = require("../utils/jwt");
const { validationResult } = require("express-validator");
const pool = require("../models/db");
const { createUser, getUserById } = require('../models/userModel');

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

    const rows = await createUser({name, email, password: hashedPassword});
    const token = generateToken(rows.id);

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user.");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { rows } = await pool.query('SELECT id, password FROM users WHERE email = $1', [email]);

    if (!rows.length) {
      return res.status(400).send('Invalid password or email');
    }

    const isValidPassword = await comparePasswords(password, rows[0].password);

    if (!isValidPassword) {
      return res.status(400).json({message: 'Invalid email or password' });
    }

    const token = generateToken(rows[0].id);
    res.json({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in.');
  }
}