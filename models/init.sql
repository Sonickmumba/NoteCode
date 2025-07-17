-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create code snippets table
CREATE TABLE IF NOT EXISTS snippets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  code TEXT NOT NULL,
  language VARCHAR(50) NOT NULL,
  theme VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
