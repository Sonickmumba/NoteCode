const express = require('express');
const router = express.Router();
const { createSnippet, getSnippet } = require('../controllers/snippetController');
const { verifyToken } = require("../utils/jwt");

router.post('/snippets',  verifyToken, createSnippet);
router.get('/snippets/:id', getSnippet);

module.exports = router;
