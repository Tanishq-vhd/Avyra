// API client for Avira backend

const API_BASE = '/api';

function getToken() {
    return localStorage.getItem('avira_token');
}

function getSessionId() {
    let sid = sessionStorage.getItem('avira_session');
    if (!sid) {
        sid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
        sessionStorage.setItem('avira_session', sid);
    }
    return sid;
}

async function request(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        'X-Session-Id': getSessionId(),
        ...options.headers
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    const data = await res.json();
    if (!res.ok) {
        const err = new Error(data.error || 'Request failed');
        err.status = res.status;
        err.data = data;
        throw err;
    }
    return data;
}

export const api = {
    // Auth
    register: (email, password, name) => request('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, name }) }),
    login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    googleAuth: (credential) => request('/auth/google', { method: 'POST', body: JSON.stringify({ credential }) }),
    getMe: () => request('/auth/me'),
    updatePlan: (plan) => request('/auth/plan', { method: 'PUT', body: JSON.stringify({ plan }) }),

    // Logos
    generateLogos: (brandName, description, industry, tagline) =>
        request('/logos/generate', { method: 'POST', body: JSON.stringify({ brandName, description, industry, tagline }) }),
    getSessionLogos: (sessionId, params = {}) => {
        const q = new URLSearchParams(params).toString();
        return request(`/logos/session/${sessionId}${q ? '?' + q : ''}`);
    },
    getMyLogos: (params = {}) => {
        const q = new URLSearchParams(params).toString();
        return request(`/logos/my${q ? '?' + q : ''}`);
    },
    getLogo: (id) => request(`/logos/${id}`),
    updateLogo: (id, config) => request(`/logos/${id}`, { method: 'PUT', body: JSON.stringify({ config }) }),
    toggleFavorite: (id) => request(`/logos/${id}/favorite`, { method: 'POST' }),
    downloadLogo: (id, format) => request(`/logos/${id}/download`, { method: 'POST', body: JSON.stringify({ format }) }),

    // Payments
    getPlans: () => request('/payments/plans'),
    getRazorpayKey: () => request('/payments/key'),
    createOrder: (plan) => request('/payments/create-order', { method: 'POST', body: JSON.stringify({ plan }) }),
    verifyPayment: (data) => request('/payments/verify', { method: 'POST', body: JSON.stringify(data) }),
    activatePayment: () => request('/auth/activate-payment', { method: 'POST' }),

    // Utils
    getToken,
    getSessionId,
    setToken: (token) => localStorage.setItem('avira_token', token),
    clearToken: () => localStorage.removeItem('avira_token'),
};

// Auth state
export const auth = {
    _user: null,
    _listeners: [],

    get user() { return this._user; },
    get isLoggedIn() { return !!this._user; },

    setUser(user, token) {
        this._user = user;
        if (token) api.setToken(token);
        this._listeners.forEach(fn => fn(user));
    },

    logout() {
        this._user = null;
        api.clearToken();
        this._listeners.forEach(fn => fn(null));
    },

    onChange(fn) {
        this._listeners.push(fn);
        return () => { this._listeners = this._listeners.filter(f => f !== fn); };
    },

    async init() {
        const token = api.getToken();
        if (!token) return;
        try {
            const { user } = await api.getMe();
            this._user = user;
            this._listeners.forEach(fn => fn(user));
        } catch {
            api.clearToken();
        }
    }
};
