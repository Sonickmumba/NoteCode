const pool = require('./db');

const Snippet = {
  sendSnippet: async (id, userId, code, language, theme) => {
    const query = `INSERT INTO snippets (id, user_id, code, language, theme) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    const { rows } = await pool.query(query, [id, userId, code, language, theme]);

    return rows[0];
  },

  getSnippet: async (id) => {
    const { rows } = await pool.query('SELECT * FROM snippets WHERE id = $1', [id]);
    return rows;
  }
}

module.exports = Snippet