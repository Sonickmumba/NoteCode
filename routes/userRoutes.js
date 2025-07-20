const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require("../utils/jwt");

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout)

router.get("/me", verifyToken, userController.getMe);

module.exports = router;
