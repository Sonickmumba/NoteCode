const express = require('express');
const router = express.Router();
const { createSnippet, getSnippet } = require('../controllers/snippetController');

router.post('/snippets', createSnippet);
router.get('/snippets/:id', getSnippet);

module.exports = router;
