const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({
      id: userId,
      // name: user.name,
      // email: user.email,
    }, JWT_SECRET, {expiresIn: '1h'});
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user; // Save user ID to request for later use
    next();
  });
}

// Hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare passwords
const comparePasswords = async (inputPassword, dbPassword) => {
  return await bcrypt.compare(inputPassword, dbPassword);
};

module.exports = { generateToken, verifyToken, hashPassword, comparePasswords };