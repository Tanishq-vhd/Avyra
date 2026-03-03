import './styles/index.css';
import './styles/components.css';
import './styles/pages.css';
import { renderNav } from './components/nav.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './pages/home.js';
import { renderGenerate } from './pages/generate.js';
import { renderEditor } from './pages/editor.js';
import { renderPricing } from './pages/pricing.js';
import { renderPayment } from './pages/payment.js';
import { renderPaymentSuccess } from './pages/paymentSuccess.js';
import { showAuthModal } from './components/authModal.js';
import { auth } from './api.js';

// SPA Router
const routes = {
    '/': renderHome,
    '/generate': renderGenerate,
    '/editor': renderEditor,
    '/pricing': renderPricing,
    '/payment': renderPayment,
    '/payment-success': renderPaymentSuccess
};

// Pages that require authentication + payment
const PROTECTED_PAGES = ['/generate', '/editor'];

function getRoute() {
    const hash = window.location.hash.slice(1) || '/';
    if (hash.startsWith('/editor/')) {
        return { page: '/editor', params: { id: hash.split('/')[2] } };
    }
    return { page: hash, params: {} };
}

async function navigate() {
    const main = document.getElementById('app-main');
    const { page, params } = getRoute();

    // Gate: protected pages require login + payment
    if (PROTECTED_PAGES.includes(page)) {
        if (!auth.isLoggedIn) {
            // Not logged in → show auth modal, then redirect
            showAuthModal('register');
            window.location.hash = '#/';
            return;
        }
        if (!auth.user.has_paid) {
            // Logged in but hasn't paid → redirect to payment
            window.location.hash = '#/payment';
            return;
        }
    }

    // Payment page requires login but NOT payment (that's the whole point)
    if (page === '/payment') {
        if (!auth.isLoggedIn) {
            showAuthModal('register');
            window.location.hash = '#/';
            return;
        }
        if (auth.user.has_paid) {
            // Already paid → go to generate
            window.location.hash = '#/generate';
            return;
        }
    }

    // Payment success page requires login + has_paid
    if (page === '/payment-success') {
        if (!auth.isLoggedIn || !auth.user.has_paid) {
            window.location.hash = '#/';
            return;
        }
    }

    const renderFn = routes[page];

    if (!renderFn) {
        main.innerHTML = `
      <div style="text-align:center;padding:var(--space-20)">
        <h2 style="font-size:var(--text-3xl);font-weight:600;margin-bottom:var(--space-4)">404</h2>
        <p style="color:var(--color-text-secondary)">Page not found</p>
        <a href="#/" class="btn btn--primary" style="margin-top:var(--space-6)">Go Home</a>
      </div>
    `;
        return;
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0 });

    if (page === '/editor' && params.id) {
        await renderEditor(main, params.id);
    } else {
        renderFn(main);
    }
}

// Initialize
async function init() {
    await auth.init();

    // Re-render nav on auth changes
    auth.onChange(() => {
        renderNav(document.getElementById('app-nav'));
    });

    renderNav(document.getElementById('app-nav'));
    renderFooter(document.getElementById('app-footer'));

    window.addEventListener('hashchange', navigate);
    window.addEventListener('show-auth', () => showAuthModal('login'));

    navigate();
}

init().catch(console.error);
