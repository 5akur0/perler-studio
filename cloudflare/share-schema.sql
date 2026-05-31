CREATE TABLE IF NOT EXISTS shares (
  short_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  pattern_code TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  password_alg TEXT NOT NULL,
  manage_hash TEXT NOT NULL,
  manage_salt TEXT NOT NULL,
  manage_alg TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_shares_updated_at ON shares(updated_at);

