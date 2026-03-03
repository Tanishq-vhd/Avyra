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
          <span style="font-size:18px">→</span>
        </a>
        <a href="#/pricing" class="btn btn--secondary btn--lg">View Pricing</a>
      </div>
      <p class="hero__price-tag">Free preview • No sign-up required • <strong>₹199</strong> to download</p>
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
          <div class="feature-card__icon">✏️</div>
          <h3 class="feature-card__title">Describe your brand</h3>
          <p class="feature-card__desc">Enter your brand name, a short description, and your industry. Our AI understands context and creates logos that match your vision.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">✨</div>
          <h3 class="feature-card__title">AI generates variations</h3>
          <p class="feature-card__desc">Instantly get 10+ unique logo concepts across different styles — minimal, luxury, modern, bold, abstract, and more.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">🎨</div>
          <h3 class="feature-card__title">Customize & download</h3>
          <p class="feature-card__desc">Fine-tune colors, typography, layout, and spacing. Download in PNG, SVG, or as a complete brand kit.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">🔁</div>
          <h3 class="feature-card__title">Remix & regenerate</h3>
          <p class="feature-card__desc">Not quite right? Remix any design into new variations or regenerate for completely fresh concepts.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">📐</div>
          <h3 class="feature-card__title">10 style categories</h3>
          <p class="feature-card__desc">Filter by Minimal, Luxury, Modern Tech, Bold, Playful, Abstract, Wordmark, Icon+Text, Emblem, or Monogram.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">💎</div>
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
