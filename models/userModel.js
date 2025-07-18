const pool = require('./db');

exports.createUser = async ({ name, email, password }) => {
  const result = await pool.query(
    `INSERT INTO users (id, name, email, password)
     VALUES (uuid_generate_v4(), $1, $2, $3)
     RETURNING *`,
    [name, email, password]
  );
  return result.rows[0];
};

exports.getUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, name, email, created_at FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};
