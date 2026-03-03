import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';

const router = Router();

const PLANS = {
    starter: { price: 199, currency: 'INR', downloads: 3, features: ['High resolution PNG', 'Transparent background', 'Commercial usage'] },
    pro: { price: 499, currency: 'INR', downloads: 999999, features: ['Unlimited downloads', 'SVG + vector', 'Brand kit', 'Social media kit', 'Dark/light versions'] }
};

router.get('/plans', (req, res) => {
    res.json({ plans: PLANS });
});

// Simulate payment and upgrade plan
router.post('/checkout', requireAuth, (req, res) => {
    try {
        const { plan } = req.body;
        if (!PLANS[plan]) {
            return res.status(400).json({ error: 'Invalid plan' });
        }

        // In production: integrate Razorpay/Stripe here
        // For now, simulate successful payment
        const user = User.updatePlan(req.user.id, plan);

        res.json({
            success: true,
            message: `Upgraded to ${plan} plan`,
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan, download_limit: user.download_limit }
        });
    } catch (err) {
        console.error('Checkout error:', err);
        res.status(500).json({ error: 'Checkout failed' });
    }
});

export default router;
