-- posts table for blog articles
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'bbki.ng',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- indexes for common queries
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_title ON posts(title);
