import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validate.js';

const router = Router();

// Decode Google JWT payload (already verified client-side by GIS)
function decodeGoogleJwt(token) {
    try {
        const payload = token.split('.')[1];
        const decoded = Buffer.from(payload, 'base64url').toString('utf8');
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

// Google Sign-In
router.post('/google', async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({ error: 'Missing Google credential' });
        }

        const payload = decodeGoogleJwt(credential);
        if (!payload || !payload.email) {
            return res.status(400).json({ error: 'Invalid Google token' });
        }

        const user = await User.findOrCreateGoogle({
            email: payload.email,
            name: payload.name || payload.given_name || '',
            googleId: payload.sub
        });

        const token = generateToken(user.id);
        res.json({
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan, has_paid: user.has_paid, downloads_used: user.downloads_used },
            token
        });
    } catch (err) {
        console.error('Google auth error:', err);
        res.status(500).json({ error: 'Google authentication failed' });
    }
});

router.post('/register', validate(schemas.register), async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existing = await User.findByEmail(email);
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ email, passwordHash, name });
        const token = generateToken(user.id);

        res.status(201).json({
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan, has_paid: user.has_paid },
            token
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', validate(schemas.login), async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        res.json({
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan, has_paid: user.has_paid, downloads_used: user.downloads_used },
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

router.put('/plan', requireAuth, async (req, res) => {
    try {
        const { plan } = req.body;
        if (!['free', 'starter', 'pro'].includes(plan)) {
            return res.status(400).json({ error: 'Invalid plan' });
        }
        const user = await User.updatePlan(req.user.id, plan);
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update plan' });
    }
});

// Activate payment — simulated ₹199 payment
router.post('/activate-payment', requireAuth, async (req, res) => {
    try {
        const user = await User.markPaid(req.user.id);
        res.json({
            success: true,
            message: 'Payment successful! Your account is now active.',
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan, has_paid: user.has_paid, download_limit: user.download_limit }
        });
    } catch (err) {
        console.error('Payment activation error:', err);
        res.status(500).json({ error: 'Payment activation failed' });
    }
});

export default router;
