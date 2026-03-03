const buckets = new Map();

const CLEANUP_INTERVAL = 60000;
setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
        if (now - bucket.lastRefill > 300000) {
            buckets.delete(key);
        }
    }
}, CLEANUP_INTERVAL);

export function rateLimit({ windowMs = 60000, max = 60, message = 'Too many requests' } = {}) {
    return (req, res, next) => {
        const key = req.ip || req.connection.remoteAddress;
        const now = Date.now();

        if (!buckets.has(key)) {
            buckets.set(key, { tokens: max - 1, lastRefill: now });
            return next();
        }

        const bucket = buckets.get(key);
        const elapsed = now - bucket.lastRefill;
        const refillRate = max / windowMs;
        bucket.tokens = Math.min(max, bucket.tokens + elapsed * refillRate);
        bucket.lastRefill = now;

        if (bucket.tokens < 1) {
            res.set('Retry-After', Math.ceil(windowMs / 1000));
            return res.status(429).json({ error: message });
        }

        bucket.tokens -= 1;
        next();
    };
}

export function generateRateLimit() {
    return rateLimit({ windowMs: 60000, max: 10, message: 'Logo generation rate limit exceeded. Please wait.' });
}
