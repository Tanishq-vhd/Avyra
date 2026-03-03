import { getDatabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const db = () => getDatabase();

export const Download = {
    create({ userId, logoId, format, filePath, fileSize }) {
        const id = uuidv4();
        db().prepare(`
      INSERT INTO downloads (id, user_id, logo_id, format, file_path, file_size)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, userId || null, logoId, format, filePath || '', fileSize || 0);
        return this.findById(id);
    },

    findById(id) {
        return db().prepare('SELECT * FROM downloads WHERE id = ?').get(id);
    },

    findByUser(userId, { limit = 50, offset = 0 } = {}) {
        return db().prepare(`
      SELECT d.*, l.brand_name, l.style, l.svg_data 
      FROM downloads d
      JOIN logos l ON d.logo_id = l.id
      WHERE d.user_id = ?
      ORDER BY d.created_at DESC
      LIMIT ? OFFSET ?
    `).all(userId, limit, offset);
    },

    countByUser(userId) {
        return db().prepare('SELECT COUNT(*) as count FROM downloads WHERE user_id = ?').get(userId).count;
    },

    countToday(userId) {
        return db().prepare(`
      SELECT COUNT(*) as count FROM downloads 
      WHERE user_id = ? AND created_at >= date('now')
    `).get(userId).count;
    }
};
