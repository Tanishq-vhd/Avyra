import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { getDatabase, closeDatabase } from './config/database.js';
import { authMiddleware } from './middleware/auth.js';
import { rateLimit } from './middleware/rateLimit.js';
import authRoutes from './routes/auth.js';
import logoRoutes from './routes/logos.js';
import paymentRoutes from './routes/payments.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

async function startServer() {
    // Ensure data directory exists
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Initialize database
    getDatabase();
    console.log('✓ Database initialized');

    const app = express();

    // Core middleware
    app.use(cors());
    app.use(express.json({ limit: '10mb' }));
    app.use(rateLimit({ windowMs: 60000, max: 120 }));

    // Auth middleware (soft - attaches user if token present)
    app.use(authMiddleware);

    // API routes
    app.use('/api/auth', authRoutes);
    app.use('/api/logos', logoRoutes);
    app.use('/api/payments', paymentRoutes);

    // Health check
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error('Unhandled error:', err);
        res.status(500).json({ error: 'Internal server error' });
    });

    if (IS_PROD) {
        // Serve static files in production
        const distPath = path.join(__dirname, '..', 'dist');
        app.use(express.static(distPath));
        app.get('*', (req, res) => {
            res.sendFile(path.join(distPath, 'index.html'));
        });
    } else {
        // Use Vite dev server as middleware in development
        const projectRoot = path.join(__dirname, '..');
        const vite = await createViteServer({
            root: projectRoot,
            server: { middlewareMode: true },
            appType: 'spa'
        });
        app.use(vite.middlewares);
    }

    app.listen(PORT, () => {
        console.log(`\n  ✦ Avyra Server running at http://localhost:${PORT}\n`);
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\nShutting down...');
        closeDatabase();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        closeDatabase();
        process.exit(0);
    });
}

startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
