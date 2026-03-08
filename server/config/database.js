import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'data', 'avira.db');

let db;

export function getDatabase() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.pragma('busy_timeout = 5000');
    db.pragma('synchronous = NORMAL');
    db.pragma('cache_size = -64000'); // 64MB cache
    runMigrations(db);
  }
  return db;
}

function runMigrations(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT '',
      plan TEXT NOT NULL DEFAULT 'free',
      has_paid INTEGER NOT NULL DEFAULT 0,
      downloads_used INTEGER NOT NULL DEFAULT 0,
      download_limit INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS logos (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      session_id TEXT,
      brand_name TEXT NOT NULL,
      description TEXT DEFAULT '',
      industry TEXT DEFAULT '',
      tagline TEXT DEFAULT '',
      style TEXT NOT NULL,
      svg_data TEXT NOT NULL,
      config TEXT NOT NULL DEFAULT '{}',
      is_favorite INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_logos_user_id ON logos(user_id);
    CREATE INDEX IF NOT EXISTS idx_logos_session_id ON logos(session_id);
    CREATE INDEX IF NOT EXISTS idx_logos_style ON logos(style);
    CREATE INDEX IF NOT EXISTS idx_logos_brand_name ON logos(brand_name);
    CREATE INDEX IF NOT EXISTS idx_logos_created_at ON logos(created_at);

    CREATE TABLE IF NOT EXISTS downloads (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      logo_id TEXT NOT NULL,
      format TEXT NOT NULL,
      file_path TEXT DEFAULT '',
      file_size INTEGER DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
      FOREIGN KEY (logo_id) REFERENCES logos(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON downloads(user_id);
    CREATE INDEX IF NOT EXISTS idx_downloads_logo_id ON downloads(logo_id);

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
  `);

  // Migration: add has_paid column to existing databases
  try {
    db.prepare("SELECT has_paid FROM users LIMIT 1").get();
  } catch {
    db.exec("ALTER TABLE users ADD COLUMN has_paid INTEGER NOT NULL DEFAULT 0");
  }
}

export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
