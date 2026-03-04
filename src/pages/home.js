export function renderHome(container) {
  container.innerHTML = `
  <section class="hero">
    <div class="container">
      <div class="hero__eyebrow">
        <span class="hero__eyebrow-dot"></span>
        AI-powered logo generation
      </div>
      <h1 class="hero__title">
        Premium logos,<br/><span>crafted by AI.</span>
      </h1>
      <p class="hero__subtitle">
        Generate stunning, professional logos in seconds. Affordable branding for startups and small businesses — starting at just ₹199.
      </p>
      <div class="hero__cta">
        <a href="#/generate" class="btn btn--primary btn--lg">
          Create Your Logo
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <a href="#/pricing" class="btn btn--secondary btn--lg">View Pricing</a>
      </div>
      <p class="hero__price-tag">Free preview · No sign-up required · <strong>₹199</strong> to download</p>
    </div>
  </section>

  <section class="features">
    <div class="container">
      <div class="features__header">
        <div class="features__label">How it works</div>
        <h2 class="features__title">From idea to brand in minutes</h2>
      </div>
      <div class="features__grid stagger">
        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <h3 class="feature-card__title">Describe your brand</h3>
          <p class="feature-card__desc">Enter your brand name, a short description, and your industry. Our AI understands context and creates logos that match your vision.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <h3 class="feature-card__title">AI generates variations</h3>
          <p class="feature-card__desc">Instantly get 10+ unique logo concepts across different styles — minimal, luxury, modern, bold, abstract, and more.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22c-4.97 0-9-2.24-9-5v-.09c.88 1.34 4.29 2.59 9 2.59s8.12-1.25 9-2.59V17c0 2.76-4.03 5-9 5z"/></svg>
          </div>
          <h3 class="feature-card__title">Customize and download</h3>
          <p class="feature-card__desc">Fine-tune colors, typography, layout, and spacing. Download in PNG, SVG, or as a complete brand kit.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          </div>
          <h3 class="feature-card__title">Remix and regenerate</h3>
          <p class="feature-card__desc">Not quite right? Remix any design into new variations or regenerate for completely fresh concepts.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </div>
          <h3 class="feature-card__title">10 style categories</h3>
          <p class="feature-card__desc">Filter by Minimal, Luxury, Modern Tech, Bold, Playful, Abstract, Wordmark, Icon+Text, Emblem, or Monogram.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </div>
          <h3 class="feature-card__title">Production-ready files</h3>
          <p class="feature-card__desc">High-resolution PNG, vector SVG, transparent backgrounds, dark/light versions, and social media kits.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="social-proof">
    <div class="container">
      <div class="social-proof__stats stagger">
        <div class="social-proof__stat">
          <div class="social-proof__stat-number">12,400+</div>
          <div class="social-proof__stat-label">Logos generated</div>
        </div>
        <div class="social-proof__stat">
          <div class="social-proof__stat-number">3,200+</div>
          <div class="social-proof__stat-label">Happy founders</div>
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
  `;
}
