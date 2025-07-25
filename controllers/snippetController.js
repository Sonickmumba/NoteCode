const Snippet = require('../models/snippets');
const { v4: uuidv4 } = require('uuid');

exports.createSnippet = async (req, res) => {
  
  try {
    const user_id = req.user.id;
    const { code, language, theme } = req.body;

    if (!user_id || !code || !language || !theme) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = uuidv4();

    await Snippet.sendSnippet(id, user_id, code, language, theme);
    
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.getSnippet = async (req, res) => {

  try {
    const { id } = req.params;

    const snippet = await Snippet.getSnippet(id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found'});
    }

    res.json(snippet[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
