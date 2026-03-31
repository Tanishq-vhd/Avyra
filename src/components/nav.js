import { auth } from '../api.js';

export function renderNav(container) {
  const update = () => {
    const user = auth.user;
    container.innerHTML = `
    <nav class="nav" id="main-nav">
      <div class="nav__inner">
        <a href="#/" class="nav__brand">
          <svg class="nav__brand-icon" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#8b5cf6"/>
                <stop offset="50%" stop-color="#ec4899"/>
                <stop offset="100%" stop-color="#f97316"/>
              </linearGradient>
            </defs>
            <rect width="34" height="34" rx="10" fill="url(#logo-grad)"/>
            <path d="M11 23L17 10L23 23H20L17 16L14 23H11Z" fill="white" opacity="0.95"/>
            <circle cx="17" cy="11" r="2" fill="white" opacity="0.6"/>
          </svg>
          <span class="nav__brand-text">Avira AI</span>
        </a>
        <div class="nav__links">
          <a href="#/" class="nav__link" data-link="home">Home</a>
          <a href="#/generate" class="nav__link" data-link="generate">Features</a>
          <a href="#/pricing" class="nav__link" data-link="pricing">Pricing</a>
          <a href="#/" class="nav__link" data-link="gallery">Gallery</a>
          <a href="#/" class="nav__link" data-link="contact">Contact</a>
        </div>
        <div class="nav__actions">
          ${user ? `
            <div class="nav__user" id="nav-user-btn">
              <div class="nav__avatar">${(user.name || user.email)[0].toUpperCase()}</div>
              <span style="font-size:var(--text-sm);font-weight:500">${user.name || 'Account'}</span>
              ${user.plan !== 'free' ? `<span class="badge badge--pro">${user.plan}</span>` : ''}
            </div>
            <button class="btn btn--ghost btn--sm" id="nav-logout-btn">Logout</button>
          ` : `
            <button class="btn btn--ghost btn--sm" id="nav-login-btn">Sign In</button>
            <a href="#/generate" class="btn btn--primary btn--sm">Get Started</a>
          `}
        </div>
        <button class="nav__mobile-toggle" id="nav-mobile-toggle" aria-label="Toggle menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </nav>`;

    // Scroll effect
    const nav = container.querySelector('.nav');
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active link
    const updateActiveLink = () => {
      const hash = location.hash || '#/';
      container.querySelectorAll('.nav__link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('nav__link--active', hash === href || (hash.startsWith(href) && href !== '#/'));
      });
    };
    window.addEventListener('hashchange', updateActiveLink);
    updateActiveLink();

    // Events
    const loginBtn = container.querySelector('#nav-login-btn');
    if (loginBtn) loginBtn.addEventListener('click', () => window.dispatchEvent(new CustomEvent('show-auth')));

    const logoutBtn = container.querySelector('#nav-logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => {
      auth.logout();
      window.location.hash = '#/';
    });
  };

  auth.onChange(update);
  update();
}
