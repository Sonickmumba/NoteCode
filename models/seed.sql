-- Enable the uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clear existing data
TRUNCATE TABLE snippets RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- Seed users
INSERT INTO users (id, name, email, password, created_at)
VALUES
  (uuid_generate_v4(), 'Alice', 'alice@example.com', 'Alice12', NOW()),
  (uuid_generate_v4(), 'Bob', 'bob@example.com', 'Bob12345', NOW());

-- Re-insert the same users and store their UUIDs for snippet reference
-- Let's assume we manually fetch the UUIDs or use RETURNING in a script.
-- For now, use fixed UUIDs for clarity:
-- UUIDs here are placeholders – replace with real ones if needed

-- Delete if you want random each time
INSERT INTO users (id, name, email, password, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Alice', 'alice@example.com', 'Alice12', NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Bob', 'bob@example.com', 'Bob12345', NOW());

-- Seed snippets
INSERT INTO snippets (id, user_id, code, language, theme, created_at)
VALUES
  (
    uuid_generate_v4(),
    '11111111-1111-1111-1111-111111111111',
    '<html><head><title>Hello</title></head><body><h1>Hi Alice</h1></body></html>',
    'html',
    'light',
    NOW()
  ),
  (
    uuid_generate_v4(),
    '22222222-2222-2222-2222-222222222222',
    'console.log("Hi Bob!");',
    'javascript',
    'dark',
    NOW()
  );



-- How to run the seed file
-- psql -U postgres -d NoteCode -f models/seed.sql
