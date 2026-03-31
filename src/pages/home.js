export function renderHome(container) {
  container.innerHTML = `
  <!-- ========== HERO SECTION ========== -->
  <section class="hero" id="hero-section">
    <div class="hero__orb hero__orb--1"></div>
    <div class="hero__orb hero__orb--2"></div>

    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__eyebrow">
          <span class="hero__eyebrow-dot"></span>
          <span class="hero__eyebrow-icon">✨</span>
          AI-Powered Logo Generation
        </div>

        <h1 class="hero__title">
          Design Stunning<br>Logos in Seconds<br><span>with AI</span>
        </h1>

        <p class="hero__subtitle">
          Create professional logos instantly using smart AI tools. 
          From concept to download in under 30 seconds.
        </p>

        <div class="hero__search" id="hero-search-bar">
          <input 
            type="text" 
            class="hero__search-input" 
            placeholder="Enter your brand name..." 
            id="hero-brand-input"
          />
          <select class="hero__search-select" id="hero-style-select">
            <option value="">Logo Style</option>
            <option value="minimal">Minimal</option>
            <option value="modern">Modern</option>
            <option value="luxury">Luxury</option>
            <option value="bold">Bold</option>
            <option value="playful">Playful</option>
            <option value="abstract">Abstract</option>
          </select>
          <button class="hero__search-btn" id="hero-generate-btn">
            <span style="display:flex;align-items:center;gap:6px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              Generate Logo
            </span>
          </button>
        </div>
      </div>

      <div class="hero__visual">
        <img src="/hero-illustration.png" alt="AI Logo Generator Illustration" class="hero__illustration" />
        
        <div class="hero__floating hero__float-card hero__float-card--rating">
          <div class="hero__float-icon hero__float-icon--purple">⭐</div>
          <div>
            <div style="font-weight:700;font-size:13px;">4.9 Rating</div>
            <div style="font-size:10px;color:var(--color-text-tertiary)">12K+ reviews</div>
          </div>
        </div>

        <div class="hero__floating hero__float-card hero__float-card--users">
          <div class="hero__float-icon hero__float-icon--pink">👥</div>
          <div>
            <div style="font-weight:700;font-size:13px;">1M+ Users</div>
            <div style="font-size:10px;color:var(--color-text-tertiary)">Worldwide</div>
          </div>
        </div>

        <div class="hero__floating hero__float-card hero__float-card--ai">
          <div class="hero__float-icon hero__float-icon--blue">🤖</div>
          <div>
            <div style="font-weight:700;font-size:13px;">AI Powered</div>
            <div style="font-size:10px;color:var(--color-text-tertiary)">Smart Design</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== TRUST SECTION ========== -->
  <section class="trust" id="trust-section">
    <div class="container">
      <div class="trust__text">Trusted by 1M+ creators across the globe</div>
      <div class="trust__logos">
        <span class="trust__logo">Spotify</span>
        <span class="trust__logo">Notion</span>
        <span class="trust__logo">Stripe</span>
        <span class="trust__logo">Figma</span>
        <span class="trust__logo">Vercel</span>
        <span class="trust__logo">Slack</span>
      </div>
    </div>
  </section>

  <!-- ========== FEATURES SECTION ========== -->
  <section class="features" id="features-section">
    <div class="container">
      <div class="features__header">
        <div class="features__label">Features</div>
        <h2 class="features__title">Smart Features for Perfect Branding</h2>
      </div>
      <div class="features__grid stagger">
        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          </div>
          <h3 class="feature-card__title">AI Logo Generator</h3>
          <p class="feature-card__desc">Powered by advanced AI that understands your brand context and generates unique, professional logos instantly.</p>
        </div>

        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22c-4.97 0-9-2.24-9-5v-.09c.88 1.34 4.29 2.59 9 2.59s8.12-1.25 9-2.59V17c0 2.76-4.03 5-9 5z"/></svg>
          </div>
          <h3 class="feature-card__title">Style Customization</h3>
          <p class="feature-card__desc">Fine-tune every aspect — colors, typography, layout, and style. Make it truly yours with intuitive controls.</p>
        </div>

        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </div>
          <h3 class="feature-card__title">Instant Download</h3>
          <p class="feature-card__desc">Download in high-res PNG, vector SVG, or as a complete brand kit. Ready for print and digital use.</p>
        </div>

        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          </div>
          <h3 class="feature-card__title">Smart Color & Font</h3>
          <p class="feature-card__desc">AI suggests the perfect color palettes and font pairings that match your brand's personality and industry.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== CATEGORIES SECTION ========== -->
  <section class="categories" id="categories-section">
    <div class="container">
      <div class="categories__header">
        <div class="categories__label">Logo Styles</div>
        <h2 class="categories__title">Explore Logo Categories</h2>
      </div>
      <div class="categories__grid stagger">
        <div class="category-card category-card--minimal">
          <div class="category-card__visual">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="20" stroke="rgba(139,92,246,0.6)" stroke-width="2"/>
              <circle cx="32" cy="32" r="8" fill="rgba(139,92,246,0.3)"/>
            </svg>
          </div>
          <div class="category-card__info">
            <div class="category-card__name">Minimal</div>
            <div class="category-card__desc">Clean, simple, elegant designs</div>
          </div>
        </div>

        <div class="category-card category-card--tech">
          <div class="category-card__visual">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="12" y="12" width="40" height="40" rx="8" stroke="rgba(59,130,246,0.6)" stroke-width="2"/>
              <path d="M24 32L30 38L40 26" stroke="rgba(59,130,246,0.8)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="category-card__info">
            <div class="category-card__name">Tech</div>
            <div class="category-card__desc">Modern, digital, innovative</div>
          </div>
        </div>

        <div class="category-card category-card--luxury">
          <div class="category-card__visual">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <polygon points="32,8 40,28 62,28 44,40 50,60 32,48 14,60 20,40 2,28 24,28" stroke="rgba(245,158,11,0.6)" stroke-width="2" fill="rgba(245,158,11,0.1)"/>
            </svg>
          </div>
          <div class="category-card__info">
            <div class="category-card__name">Luxury</div>
            <div class="category-card__desc">Premium, elegant, sophisticated</div>
          </div>
        </div>

        <div class="category-card category-card--creative">
          <div class="category-card__visual">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="26" cy="26" r="14" fill="rgba(236,72,153,0.15)" stroke="rgba(236,72,153,0.4)" stroke-width="2"/>
              <circle cx="38" cy="26" r="14" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.4)" stroke-width="2"/>
              <circle cx="32" cy="38" r="14" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.4)" stroke-width="2"/>
            </svg>
          </div>
          <div class="category-card__info">
            <div class="category-card__name">Creative</div>
            <div class="category-card__desc">Colorful, playful, artistic</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== PROCESS SECTION ========== -->
  <section class="process" id="process-section">
    <div class="container">
      <div class="process__header">
        <div class="process__label">How It Works</div>
        <h2 class="process__title">Four Simple Steps to Your Logo</h2>
      </div>
      <div class="process__steps stagger">
        <div class="process__step">
          <div class="process__step-number">
            <span style="font-size:24px">✏️</span>
          </div>
          <h3 class="process__step-title">Enter Brand Name</h3>
          <p class="process__step-desc">Type your brand name and choose your industry for context-aware designs.</p>
        </div>

        <div class="process__step">
          <div class="process__step-number">
            <span style="font-size:24px">🎨</span>
          </div>
          <h3 class="process__step-title">Choose Style</h3>
          <p class="process__step-desc">Pick from minimal, modern, luxury, bold, and 10+ other style categories.</p>
        </div>

        <div class="process__step">
          <div class="process__step-number">
            <span style="font-size:24px">🤖</span>
          </div>
          <h3 class="process__step-title">AI Generates Logo</h3>
          <p class="process__step-desc">Our AI creates multiple unique logo concepts tailored to your brand in seconds.</p>
        </div>

        <div class="process__step">
          <div class="process__step-number">
            <span style="font-size:24px">⬇️</span>
          </div>
          <h3 class="process__step-title">Download & Use</h3>
          <p class="process__step-desc">Download high-res files in PNG, SVG, or as a complete brand kit.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== SHOWCASE SECTION ========== -->
  <section class="showcase" id="showcase-section">
    <div class="container">
      <div class="showcase__header">
        <div class="showcase__label">Gallery</div>
        <h2 class="showcase__title">Logos Created with Avira AI</h2>
      </div>
      <div class="showcase__grid stagger" id="showcase-grid">
      </div>
    </div>
  </section>

  <!-- ========== STATS SECTION ========== -->
  <section class="social-proof" id="stats-section">
    <div class="container">
      <div class="social-proof__stats stagger">
        <div class="social-proof__stat">
          <div class="social-proof__stat-number">1M+</div>
          <div class="social-proof__stat-label">Logos generated</div>
        </div>
        <div class="social-proof__stat">
          <div class="social-proof__stat-number">500K+</div>
          <div class="social-proof__stat-label">Happy creators</div>
        </div>
        <div class="social-proof__stat">
          <div class="social-proof__stat-number">4.9</div>
          <div class="social-proof__stat-label">Average rating</div>
        </div>
        <div class="social-proof__stat">
          <div class="social-proof__stat-number">< 5s</div>
          <div class="social-proof__stat-label">Generation time</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== CTA SECTION ========== -->
  <section class="cta-section" id="cta-section">
    <div class="container">
      <div class="cta-section__inner">
        <h2 class="cta-section__title">Start Creating Your<br><span class="gradient-text">Logo Today</span></h2>
        <p class="cta-section__subtitle">Join 1M+ creators who trust Avira AI for their branding needs. No design skills required.</p>
        <a href="#/generate" class="btn btn--primary btn--lg cta-section__btn">
          <span style="display:flex;align-items:center;gap:8px">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            Generate Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </a>
      </div>
    </div>
  </section>
  `;

  // Generate showcase grid with SVG logo placeholders
  generateShowcase();

  // Hero generate button click
  const genBtn = document.getElementById('hero-generate-btn');
  if (genBtn) {
    genBtn.addEventListener('click', () => {
      window.location.hash = '#/generate';
    });
  }

  // Intersection Observer for scroll animations
  setupScrollAnimations();
}

function generateShowcase() {
  const grid = document.getElementById('showcase-grid');
  if (!grid) return;

  const logos = [
    { name: 'Nexus', type: 'Tech Startup', img: '/logos/logo-1.png' },
    { name: 'Zenith', type: 'Luxury Brand', img: '/logos/logo-2.png' },
    { name: 'Pulse', type: 'Creative Agency', img: '/logos/logo-3.png' },
    { name: 'Atlas', type: 'Fitness Brand', img: '/logos/logo-4.png' },
    { name: 'Nova', type: 'AI Company', img: '/logos/logo-5.png' },
    { name: 'Orbit', type: 'Space Tech', img: '/logos/logo-6.png' },
    { name: 'Prism', type: 'Design Studio', img: '/logos/logo-7.png' },
    { name: 'Apex', type: 'Adventure Brand', img: '/logos/logo-8.png' },
  ];

  grid.innerHTML = logos.map((logo, i) => `
    <div class="showcase__item" style="animation-delay:${i * 80}ms">
      <img src="${logo.img}" alt="${logo.name} logo" loading="lazy" />
      <div class="showcase__item-overlay">
        <div class="showcase__item-label">${logo.name} — ${logo.type}</div>
      </div>
    </div>
  `).join('');
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Observe sections
  document.querySelectorAll('.trust, .features, .categories, .process, .showcase, .social-proof, .cta-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(section);
  });
}
