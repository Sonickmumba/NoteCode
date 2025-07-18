const Snippet = require('../models/snippets');
const { v4: uuidv4 } = require('uuid');

exports.createSnippet = async (req, res) => {
  const { userId, code, language, theme } = req.body;
  const id = uuidv4();

  try {
    await Snippet.sendSnippet(id, userId, code, language, theme);
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.getSnippet = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Snippet.getSnippet(id);
    if (result === 0) {
      return res.status(404).json({ message: 'Snippet not found'});
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
