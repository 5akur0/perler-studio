ALTER TABLE shares ADD COLUMN expires_at TEXT;
UPDATE shares
SET expires_at = datetime(updated_at, '+7 days')
WHERE expires_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_shares_expires_at ON shares(expires_at);
