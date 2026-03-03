import { getDatabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const db = () => getDatabase();

export const Logo = {
    create({ userId, sessionId, brandName, description, industry, tagline, style, svgData, config }) {
        const id = uuidv4();
        const stmt = db().prepare(`
      INSERT INTO logos (id, user_id, session_id, brand_name, description, industry, tagline, style, svg_data, config)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, userId || null, sessionId, brandName, description || '', industry || '', tagline || '', style, svgData, JSON.stringify(config || {}));
        return this.findById(id);
    },

    createBatch(logos) {
        const stmt = db().prepare(`
      INSERT INTO logos (id, user_id, session_id, brand_name, description, industry, tagline, style, svg_data, config)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        const insertMany = db().transaction((items) => {
            const results = [];
            for (const l of items) {
                const id = uuidv4();
                stmt.run(id, l.userId || null, l.sessionId, l.brandName, l.description || '', l.industry || '', l.tagline || '', l.style, l.svgData, JSON.stringify(l.config || {}));
                results.push(id);
            }
            return results;
        });
        const ids = insertMany(logos);
        return ids.map(id => this.findById(id));
    },

    findById(id) {
        const row = db().prepare('SELECT * FROM logos WHERE id = ?').get(id);
        if (row) row.config = JSON.parse(row.config);
        return row;
    },

    findByUser(userId, { limit = 50, offset = 0, style } = {}) {
        let query = 'SELECT * FROM logos WHERE user_id = ?';
        const params = [userId];
        if (style) {
            query += ' AND style = ?';
            params.push(style);
        }
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);
        const rows = db().prepare(query).all(...params);
        rows.forEach(r => r.config = JSON.parse(r.config));
        return rows;
    },

    findBySession(sessionId, { limit = 50, offset = 0, style } = {}) {
        let query = 'SELECT * FROM logos WHERE session_id = ?';
        const params = [sessionId];
        if (style) {
            query += ' AND style = ?';
            params.push(style);
        }
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);
        const rows = db().prepare(query).all(...params);
        rows.forEach(r => r.config = JSON.parse(r.config));
        return rows;
    },

    updateConfig(id, config) {
        db().prepare('UPDATE logos SET config = ? WHERE id = ?').run(JSON.stringify(config), id);
        return this.findById(id);
    },

    toggleFavorite(id) {
        db().prepare('UPDATE logos SET is_favorite = CASE WHEN is_favorite = 1 THEN 0 ELSE 1 END WHERE id = ?').run(id);
        return this.findById(id);
    },

    delete(id) {
        db().prepare('DELETE FROM logos WHERE id = ?').run(id);
    },

    countByUser(userId) {
        return db().prepare('SELECT COUNT(*) as count FROM logos WHERE user_id = ?').get(userId).count;
    },

    countBySession(sessionId) {
        return db().prepare('SELECT COUNT(*) as count FROM logos WHERE session_id = ?').get(sessionId).count;
    }
};
