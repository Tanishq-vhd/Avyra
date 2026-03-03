import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validate.js';

const router = Router();

router.post('/register', validate(schemas.register), async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existing = User.findByEmail(email);
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = User.create({ email, passwordHash, name });
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

        const user = User.findByEmail(email);
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

router.get('/me', requireAuth, (req, res) => {
    try {
        const user = User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

router.put('/plan', requireAuth, (req, res) => {
    try {
        const { plan } = req.body;
        if (!['free', 'starter', 'pro'].includes(plan)) {
            return res.status(400).json({ error: 'Invalid plan' });
        }
        const user = User.updatePlan(req.user.id, plan);
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update plan' });
    }
});

// Activate payment — simulated ₹199 payment
router.post('/activate-payment', requireAuth, (req, res) => {
    try {
        const user = User.markPaid(req.user.id);
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
