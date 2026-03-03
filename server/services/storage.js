import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORAGE_DIR = path.join(__dirname, '..', 'data', 'exports');

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

export const Storage = {
    saveSvg(logoId, svgData) {
        const filePath = path.join(STORAGE_DIR, `${logoId}.svg`);
        fs.writeFileSync(filePath, svgData, 'utf-8');
        return filePath;
    },

    getSvg(logoId) {
        const filePath = path.join(STORAGE_DIR, `${logoId}.svg`);
        if (!fs.existsSync(filePath)) return null;
        return fs.readFileSync(filePath, 'utf-8');
    },

    delete(logoId) {
        const patterns = [`${logoId}.svg`, `${logoId}.png`];
        for (const p of patterns) {
            const filePath = path.join(STORAGE_DIR, p);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    },

    getStoragePath() {
        return STORAGE_DIR;
    },

    getStats() {
        const files = fs.readdirSync(STORAGE_DIR);
        let totalSize = 0;
        for (const f of files) {
            const stat = fs.statSync(path.join(STORAGE_DIR, f));
            totalSize += stat.size;
        }
        return { files: files.length, totalSizeBytes: totalSize, totalSizeMB: (totalSize / 1024 / 1024).toFixed(2) };
    }
};
