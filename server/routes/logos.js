import { Router } from 'express';
import { Logo } from '../models/Logo.js';
import { Download } from '../models/Download.js';
import { User } from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validate.js';
import { generateRateLimit } from '../middleware/rateLimit.js';
import { generateLogos } from '../services/logoGenerator.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Generate logos - works for both authenticated and anonymous users
router.post('/generate', generateRateLimit(), validate(schemas.generateLogo), (req, res) => {
    try {
        const { brandName, description, industry, tagline } = req.body;
        const sessionId = req.headers['x-session-id'] || uuidv4();
        const userId = req.user?.id || null;

        // Generate SVG logos using the engine
        const generatedLogos = generateLogos({ brandName, description, industry, tagline });

        // Batch insert into database
        const logoRecords = generatedLogos.map(logo => ({
            userId,
            sessionId,
            brandName,
            description,
            industry,
            tagline,
            style: logo.style,
            svgData: logo.svgData,
            config: logo.config
        }));

        const saved = Logo.createBatch(logoRecords);

        res.json({
            sessionId,
            logos: saved.map(l => ({
                id: l.id,
                style: l.style,
                svgData: l.svg_data,
                config: l.config,
                brandName: l.brand_name,
                createdAt: l.created_at
            })),
            total: saved.length
        });
    } catch (err) {
        console.error('Generate error:', err);
        res.status(500).json({ error: 'Logo generation failed' });
    }
});

// Get logos by session (for anonymous users)
router.get('/session/:sessionId', (req, res) => {
    try {
        const { sessionId } = req.params;
        const { style, limit = 50, offset = 0 } = req.query;
        const logos = Logo.findBySession(sessionId, {
            style,
            limit: Math.min(parseInt(limit) || 50, 100),
            offset: parseInt(offset) || 0
        });
        const total = Logo.countBySession(sessionId);
        res.json({ logos, total, limit: parseInt(limit), offset: parseInt(offset) });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch logos' });
    }
});

// Get user's logos (authenticated)
router.get('/my', requireAuth, (req, res) => {
    try {
        const { style, limit = 50, offset = 0 } = req.query;
        const logos = Logo.findByUser(req.user.id, {
            style,
            limit: Math.min(parseInt(limit) || 50, 100),
            offset: parseInt(offset) || 0
        });
        const total = Logo.countByUser(req.user.id);
        res.json({ logos, total });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch logos' });
    }
});

// Get single logo
router.get('/:id', (req, res) => {
    try {
        const logo = Logo.findById(req.params.id);
        if (!logo) return res.status(404).json({ error: 'Logo not found' });
        res.json({ logo });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch logo' });
    }
});

// Update logo config (edit)
router.put('/:id', (req, res) => {
    try {
        const { config } = req.body;
        if (!config) return res.status(400).json({ error: 'Config required' });
        const logo = Logo.updateConfig(req.params.id, config);
        if (!logo) return res.status(404).json({ error: 'Logo not found' });
        res.json({ logo });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update logo' });
    }
});

// Toggle favorite
router.post('/:id/favorite', (req, res) => {
    try {
        const logo = Logo.toggleFavorite(req.params.id);
        if (!logo) return res.status(404).json({ error: 'Logo not found' });
        res.json({ logo });
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle favorite' });
    }
});

// Download logo
router.post('/:id/download', (req, res) => {
    try {
        const { format = 'png' } = req.body;
        const logo = Logo.findById(req.params.id);
        if (!logo) return res.status(404).json({ error: 'Logo not found' });

        const userId = req.user?.id || null;

        // Check download limits for authenticated users
        if (userId) {
            if (!User.canDownload(userId)) {
                return res.status(403).json({
                    error: 'Download limit reached',
                    upgrade: true,
                    message: 'Upgrade your plan to download more logos'
                });
            }
            User.incrementDownloads(userId);
        }

        // Record download
        Download.create({ userId, logoId: logo.id, format });

        // Return the SVG data (client handles rendering to PNG/etc)
        res.json({
            success: true,
            svgData: logo.svg_data,
            config: logo.config,
            format,
            watermark: !userId || User.findById(userId)?.plan === 'free'
        });
    } catch (err) {
        console.error('Download error:', err);
        res.status(500).json({ error: 'Download failed' });
    }
});

// Delete logo
router.delete('/:id', (req, res) => {
    try {
        Logo.delete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete logo' });
    }
});

export default router;
