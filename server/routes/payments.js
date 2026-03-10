import { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';

const router = Router();

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_live_SPa6jHrVfohESZ';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '2dKaIHrZnPoreGD0FpToYC4T';

const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
});

const PLANS = {
    starter: { price: 199, currency: 'INR', downloads: 3, features: ['High resolution PNG', 'Transparent background', 'Commercial usage'] },
    pro: { price: 499, currency: 'INR', downloads: 999999, features: ['Unlimited downloads', 'SVG + vector', 'Brand kit', 'Social media kit', 'Dark/light versions'] }
};

// Get plans
router.get('/plans', (req, res) => {
    res.json({ plans: PLANS });
});

// Get Razorpay key (safe to expose to frontend)
router.get('/key', (req, res) => {
    res.json({ key: RAZORPAY_KEY_ID });
});

// Create Razorpay order
router.post('/create-order', requireAuth, async (req, res) => {
    try {
        const { plan } = req.body;
        if (!plan || !PLANS[plan]) {
            return res.status(400).json({ error: 'Invalid plan' });
        }

        const amount = PLANS[plan].price * 100; // Razorpay expects paise

        const order = await razorpay.orders.create({
            amount,
            currency: 'INR',
            receipt: `av_${req.user.id.slice(-8)}_${Date.now().toString(36)}`,
            notes: {
                userId: req.user.id,
                plan,
                email: req.user.email || ''
            }
        });

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            plan
        });
    } catch (err) {
        console.error('Create order error:', err);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
});

// Verify payment and activate account
router.post('/verify', requireAuth, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Missing payment details' });
        }

        // Verify signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ error: 'Payment verification failed — invalid signature' });
        }

        // Payment verified — activate the user's plan
        const selectedPlan = plan || 'starter';
        const user = await User.markPaid(req.user.id);

        // If pro plan, upgrade
        if (selectedPlan === 'pro') {
            await User.updatePlan(req.user.id, 'pro');
        }

        const updatedUser = await User.findById(req.user.id);

        res.json({
            success: true,
            message: 'Payment verified and account activated!',
            paymentId: razorpay_payment_id,
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
                plan: updatedUser.plan,
                has_paid: updatedUser.has_paid,
                download_limit: updatedUser.download_limit
            }
        });
    } catch (err) {
        console.error('Verify payment error:', err);
        res.status(500).json({ error: 'Payment verification failed' });
    }
});

export default router;
