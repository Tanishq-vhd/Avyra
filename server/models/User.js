import { getDatabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const db = () => getDatabase();

export const User = {
    create({ email, passwordHash, name }) {
        const id = uuidv4();
        const stmt = db().prepare(`
      INSERT INTO users (id, email, password_hash, name)
      VALUES (?, ?, ?, ?)
    `);
        stmt.run(id, email, passwordHash, name);
        return this.findById(id);
    },

    findOrCreateGoogle({ email, name, googleId }) {
        let user = this.findByEmail(email);
        if (user) return user;
        // Create new user with empty password (Google-only)
        const id = uuidv4();
        db().prepare(`
      INSERT INTO users (id, email, password_hash, name)
      VALUES (?, ?, ?, ?)
    `).run(id, email, '__google__' + googleId, name || '');
        return this.findById(id);
    },

    findById(id) {
        return db().prepare(`
      SELECT id, email, name, plan, has_paid, downloads_used, download_limit, created_at, updated_at
      FROM users WHERE id = ?
    `).get(id);
    },

    findByEmail(email) {
        return db().prepare('SELECT * FROM users WHERE email = ?').get(email);
    },

    updatePlan(id, plan) {
        const limits = { free: 0, starter: 3, pro: 999999 };
        db().prepare(`
      UPDATE users SET plan = ?, download_limit = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(plan, limits[plan] || 0, id);
        return this.findById(id);
    },

    incrementDownloads(id) {
        db().prepare(`
      UPDATE users SET downloads_used = downloads_used + 1, updated_at = datetime('now')
      WHERE id = ?
    `).run(id);
    },

    canDownload(id) {
        const user = this.findById(id);
        if (!user) return false;
        if (user.plan === 'pro') return true;
        return user.downloads_used < user.download_limit;
    },

    markPaid(id) {
        db().prepare(`
      UPDATE users SET has_paid = 1, plan = 'starter', download_limit = 3, updated_at = datetime('now')
      WHERE id = ?
    `).run(id);
        return this.findById(id);
    },

    count() {
        return db().prepare('SELECT COUNT(*) as count FROM users').get().count;
    }
};
