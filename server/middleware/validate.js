export function validate(schema) {
    return (req, res, next) => {
        const errors = [];
        for (const [field, rules] of Object.entries(schema)) {
            const value = req.body[field];

            if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
                errors.push(`${field} is required`);
                continue;
            }

            if (value !== undefined && value !== null && value !== '') {
                if (rules.type === 'string' && typeof value !== 'string') {
                    errors.push(`${field} must be a string`);
                }
                if (rules.minLength && typeof value === 'string' && value.trim().length < rules.minLength) {
                    errors.push(`${field} must be at least ${rules.minLength} characters`);
                }
                if (rules.maxLength && typeof value === 'string' && value.trim().length > rules.maxLength) {
                    errors.push(`${field} must be at most ${rules.maxLength} characters`);
                }
                if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
                    errors.push(`${field} format is invalid`);
                }
                if (rules.enum && !rules.enum.includes(value)) {
                    errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
                }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ error: 'Validation failed', details: errors });
        }

        // Sanitize strings
        for (const [field, rules] of Object.entries(schema)) {
            if (rules.type === 'string' && typeof req.body[field] === 'string') {
                req.body[field] = req.body[field].trim();
            }
        }

        next();
    };
}

export const schemas = {
    register: {
        email: { required: true, type: 'string', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, type: 'string', minLength: 6, maxLength: 128 },
        name: { required: true, type: 'string', minLength: 1, maxLength: 100 }
    },
    login: {
        email: { required: true, type: 'string' },
        password: { required: true, type: 'string' }
    },
    generateLogo: {
        brandName: { required: true, type: 'string', minLength: 1, maxLength: 100 },
        description: { type: 'string', maxLength: 500 },
        industry: { type: 'string', maxLength: 100 },
        tagline: { type: 'string', maxLength: 200 }
    },
    updateLogo: {
        config: { required: true }
    }
};
