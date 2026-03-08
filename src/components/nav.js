import { auth } from '../api.js';

export function renderNav(container) {
  const update = () => {
    const user = auth.user;
    container.innerHTML = `
    <nav class="nav" id="main-nav">
      <div class="nav__inner">
        <a href="#/" class="nav__brand">
          <img src="/logo.png" alt="Avira" class="nav__brand-logo" />
          Avira
        </a>
        <div class="nav__links">
          <a href="#/" class="nav__link" data-link="home">Home</a>
          <a href="#/generate" class="nav__link" data-link="generate">Generate</a>
          <a href="#/pricing" class="nav__link" data-link="pricing">Pricing</a>
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
