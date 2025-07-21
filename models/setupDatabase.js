// setupDatabase.js
const pool = require("./db");

async function setupDatabase() {
  try {
    await pool.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(255),
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
        );
    `);

    // Add other tables (notes, sessions, etc.) here
    await pool.query(`
        CREATE TABLE IF NOT EXISTS snippets (
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id) ON DELETE SET NULL,
            code TEXT NOT NULL,
            language VARCHAR(50) NOT NULL,
            theme VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
        `);

    console.log("✅ Database setup completed.");
  } catch (err) {
    console.error("❌ Database setup failed:", err.message);
    throw err;
  }
}

module.exports = setupDatabase;
