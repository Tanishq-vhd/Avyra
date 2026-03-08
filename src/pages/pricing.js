import { api, auth } from '../api.js';
import { showAuthModal } from '../components/authModal.js';
import { showToast } from '../components/toast.js';

export function renderPricing(container) {
  const user = auth.user;

  container.innerHTML = `
  <div class="pricing-page">
    <div class="container">
      <div class="pricing__header slide-up">
        <div class="pricing__label">Pricing</div>
        <h1 class="pricing__title">Premium logos for just ₹199</h1>
        <p class="pricing__subtitle">Affordable, professional branding for founders, freelancers, and small businesses.</p>
      </div>

      <div class="pricing__grid stagger">
        <!-- Free -->
        <div class="card pricing-card">
          <div class="pricing-card__name">Free Preview</div>
          <div class="pricing-card__desc">Try before you buy</div>
          <div class="pricing-card__price">
            <span class="pricing-card__amount">₹0</span>
          </div>
          <ul class="pricing-card__features">
            <li>Generate unlimited logo concepts</li>
            <li>Preview all styles</li>
            <li>Watermarked samples</li>
            <li>Basic editing tools</li>
          </ul>
          <a href="#/generate" class="btn btn--secondary pricing-card__cta">
            Start Creating
          </a>
        </div>

        <!-- Starter -->
        <div class="card pricing-card pricing-card--featured">
          <div class="pricing-card__badge">
            <span class="badge badge--pro">Popular</span>
          </div>
          <div class="pricing-card__name">Starter</div>
          <div class="pricing-card__desc">Perfect for new brands</div>
          <div class="pricing-card__price">
            <span class="pricing-card__currency">₹</span>
            <span class="pricing-card__amount">199</span>
            <span class="pricing-card__period">/one-time</span>
          </div>
          <ul class="pricing-card__features">
            <li>3 logo downloads</li>
            <li>High resolution PNG</li>
            <li>Transparent background</li>
            <li>Commercial usage rights</li>
            <li>Full editing tools</li>
          </ul>
          <button class="btn btn--primary pricing-card__cta" data-plan="starter">
            ${user?.plan === 'starter' ? '✓ Current Plan' : 'Get Starter'}
          </button>
        </div>

        <!-- Pro -->
        <div class="card pricing-card">
          <div class="pricing-card__name">Pro</div>
          <div class="pricing-card__desc">Full brand kit</div>
          <div class="pricing-card__price">
            <span class="pricing-card__currency">₹</span>
            <span class="pricing-card__amount">499</span>
            <span class="pricing-card__period">/one-time</span>
          </div>
          <ul class="pricing-card__features">
            <li>Unlimited downloads</li>
            <li>SVG + vector files</li>
            <li>Complete brand kit</li>
            <li>Social media kit</li>
            <li>Dark & light versions</li>
            <li>Priority support</li>
          </ul>
          <button class="btn btn--primary pricing-card__cta" data-plan="pro" style="background:var(--color-text)">
            ${user?.plan === 'pro' ? '✓ Current Plan' : 'Get Pro'}
          </button>
        </div>
      </div>

      <div class="faq">
        <h2 class="faq__title">Frequently asked questions</h2>
        <div class="faq__item">
          <button class="faq__question">
            Can I use the logos commercially?
            <span class="faq__icon">+</span>
          </button>
          <div class="faq__answer">
            <p>Yes! All paid plans include full commercial usage rights. You can use your logos for your business, products, website, social media, print materials, and more.</p>
          </div>
        </div>
        <div class="faq__item">
          <button class="faq__question">
            What file formats do I get?
            <span class="faq__icon">+</span>
          </button>
          <div class="faq__answer">
            <p>Starter includes high-resolution PNG with transparent background. Pro includes SVG vector files, brand kit, social media kit, and both dark and light versions.</p>
          </div>
        </div>
        <div class="faq__item">
          <button class="faq__question">
            Is it a subscription or one-time payment?
            <span class="faq__icon">+</span>
          </button>
          <div class="faq__answer">
            <p>It's a one-time payment. Pay once and download your logos — no recurring charges.</p>
          </div>
        </div>
        <div class="faq__item">
          <button class="faq__question">
            Can I edit my logo after downloading?
            <span class="faq__icon">+</span>
          </button>
          <div class="faq__answer">
            <p>Yes! Pro plan includes SVG files that can be opened and edited in any vector editor like Figma, Illustrator, or Inkscape.</p>
          </div>
        </div>
        <div class="faq__item">
          <button class="faq__question">
            How is this different from other logo makers?
            <span class="faq__icon">+</span>
          </button>
          <div class="faq__answer">
            <p>Avira uses AI to generate unique, contextual logo designs based on your brand description. Each logo is procedurally created — no templates. The result is premium, diverse, and personalized.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  // Plan purchase
  container.querySelectorAll('[data-plan]').forEach(btn => {
    const plan = btn.dataset.plan;
    if (user?.plan === plan) {
      btn.disabled = true;
      return;
    }

    btn.addEventListener('click', async () => {
      if (!auth.isLoggedIn) {
        showAuthModal('register');
        return;
      }

      try {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span>';
        const result = await api.checkout(plan);
        auth.setUser(result.user);
        showToast(`Upgraded to ${plan}!`, 'success');
        renderPricing(container); // re-render to update button states
      } catch (err) {
        showToast(err.message || 'Checkout failed', 'error');
        btn.disabled = false;
        btn.textContent = `Get ${plan.charAt(0).toUpperCase() + plan.slice(1)}`;
      }
    });
  });

  // FAQ accordion
  container.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const wasOpen = item.classList.contains('faq__item--open');
      container.querySelectorAll('.faq__item').forEach(i => i.classList.remove('faq__item--open'));
      if (!wasOpen) item.classList.add('faq__item--open');
    });
  });
}
