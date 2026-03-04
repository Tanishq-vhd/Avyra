import { auth } from '../api.js';

export function renderPaymentSuccess(container) {
    const user = auth.user;
    const firstName = (user?.name || 'Creator').split(' ')[0];

    container.innerHTML = `
  <div class="ps" style="min-height:calc(100vh - var(--nav-height));display:flex;align-items:center;justify-content:center;padding:var(--space-6);position:relative;overflow:hidden">

    <!-- Confetti canvas -->
    <canvas id="confetti-canvas" style="position:absolute;inset:0;pointer-events:none;z-index:1"></canvas>

    <!-- Radial glow background -->
    <div style="position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(108,92,231,0.08) 0%,transparent 70%);pointer-events:none;z-index:0"></div>

    <div style="position:relative;z-index:2;text-align:center;max-width:520px;width:100%">

      <!-- Animated logo -->
      <div class="ps__icon">
        <div class="ps__icon-ring ps__icon-ring--outer"></div>
        <div class="ps__icon-ring ps__icon-ring--inner"></div>
        <div class="ps__icon-circle" style="background:white;padding:12px">
          <img src="/logo.png" alt="Avyra" style="width:100%;height:100%;object-fit:contain" />
        </div>
      </div>

      <!-- Title -->
      <h1 class="ps__title">Payment Successful</h1>

      <!-- Amount badge -->
      <div class="ps__amount">
        <span class="ps__amount-label">₹199</span>
        <span class="ps__amount-dot"></span>
        <span>Starter Plan Activated</span>
      </div>

      <!-- Welcome message -->
      <p class="ps__welcome">
        Welcome to Avyra, <strong>${firstName}</strong>.<br>
        Your creative journey starts now.
      </p>

      <!-- Feature pills -->
      <div class="ps__features">
        <div class="ps__feature-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          Unlimited Generations
        </div>
        <div class="ps__feature-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          3 HD Downloads
        </div>
        <div class="ps__feature-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
          Commercial License
        </div>
      </div>

      <!-- CTA Button -->
      <a href="#/generate" class="ps__cta" id="success-cta">
        <span>Start Creating</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>

      <!-- Receipt line -->
      <p class="ps__receipt">
        A receipt has been sent to <strong>${user?.email || 'your email'}</strong>
      </p>

    </div>
  </div>

  <style>
    /* Icon assembly */
    .ps__icon {
      position: relative;
      width: 96px;
      height: 96px;
      margin: 0 auto var(--space-6);
    }
    .ps__icon-ring {
      position: absolute;
      border-radius: 50%;
      border: 2px solid rgba(108,92,231,0.12);
    }
    .ps__icon-ring--outer {
      inset: -8px;
      animation: ringPulse 2s ease-out infinite;
    }
    .ps__icon-ring--inner {
      inset: -4px;
      border-color: rgba(108,92,231,0.2);
      animation: ringPulse 2s ease-out 0.3s infinite;
    }
    .ps__icon-circle {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6c5ce7, #8b7cf7);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(108,92,231,0.3), 0 0 0 6px rgba(108,92,231,0.08);
      animation: iconPop 0.7s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    .ps__check {
      animation: checkDraw 0.5s ease-out 0.4s both;
    }

    /* Title */
    .ps__title {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-text);
      margin-bottom: var(--space-3);
      animation: fadeSlideUp 0.5s ease-out 0.3s both;
    }

    /* Amount badge */
    .ps__amount {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      background: rgba(108,92,231,0.06);
      border: 1px solid rgba(108,92,231,0.12);
      border-radius: var(--radius-full);
      padding: var(--space-2) var(--space-4);
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--color-accent);
      margin-bottom: var(--space-4);
      animation: fadeSlideUp 0.5s ease-out 0.45s both;
    }
    .ps__amount-label {
      font-weight: 700;
    }
    .ps__amount-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--color-accent);
      opacity: 0.4;
    }

    /* Welcome */
    .ps__welcome {
      color: var(--color-text-secondary);
      font-size: var(--text-base);
      line-height: var(--leading-normal);
      margin-bottom: var(--space-6);
      animation: fadeSlideUp 0.5s ease-out 0.55s both;
    }
    .ps__welcome strong {
      color: var(--color-text);
    }

    /* Feature pills */
    .ps__features {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-2);
      margin-bottom: var(--space-8);
      animation: fadeSlideUp 0.5s ease-out 0.65s both;
    }
    .ps__feature-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: var(--space-2) var(--space-3);
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 500;
      color: var(--color-text-secondary);
      box-shadow: var(--shadow-xs);
    }
    .ps__feature-pill svg {
      color: var(--color-accent);
      flex-shrink: 0;
    }

    /* CTA */
    .ps__cta {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-5) var(--space-10);
      background: linear-gradient(135deg, #6c5ce7, #7c6cf7);
      color: white;
      font-size: var(--text-lg);
      font-weight: 600;
      border-radius: var(--radius-full);
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(108,92,231,0.35), 0 0 0 0 rgba(108,92,231,0.2);
      transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
      animation: fadeSlideUp 0.5s ease-out 0.75s both, ctaGlow 2.5s ease-in-out 1.5s infinite;
    }
    .ps__cta:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 30px rgba(108,92,231,0.4), 0 0 0 4px rgba(108,92,231,0.1);
    }
    .ps__cta:active {
      transform: translateY(0) scale(0.98);
    }
    .ps__cta svg {
      transition: transform 0.3s ease;
    }
    .ps__cta:hover svg {
      transform: translateX(4px);
    }

    /* Receipt */
    .ps__receipt {
      margin-top: var(--space-6);
      font-size: var(--text-xs);
      color: var(--color-text-tertiary);
      animation: fadeSlideUp 0.5s ease-out 0.85s both;
    }
    .ps__receipt strong {
      color: var(--color-text-secondary);
    }

    /* Keyframes */
    @keyframes iconPop {
      0% { transform: scale(0) rotate(-20deg); opacity: 0; }
      60% { transform: scale(1.1) rotate(4deg); }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes checkDraw {
      0% { opacity: 0; transform: scale(0.5); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes ringPulse {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.4); opacity: 0; }
    }
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(16px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes ctaGlow {
      0%, 100% { box-shadow: 0 4px 20px rgba(108,92,231,0.35), 0 0 0 0 rgba(108,92,231,0.15); }
      50% { box-shadow: 0 4px 20px rgba(108,92,231,0.35), 0 0 0 10px rgba(108,92,231,0); }
    }
  </style>
  `;

    // Confetti effect
    launchConfetti(container.querySelector('#confetti-canvas'));
}

function launchConfetti(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const colors = ['#6c5ce7', '#8b7cf7', '#a29bfe', '#fdcb6e', '#00b894', '#e17055', '#ff7675', '#74b9ff'];
    const particles = [];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 100,
            y: canvas.height / 2 - 60,
            vx: (Math.random() - 0.5) * 12,
            vy: -(Math.random() * 10 + 4),
            w: Math.random() * 8 + 4,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 12,
            gravity: 0.12,
            opacity: 1,
            decay: 0.003 + Math.random() * 0.004,
        });
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach(p => {
            if (p.opacity <= 0) return;
            alive = true;

            p.x += p.vx;
            p.vy += p.gravity;
            p.y += p.vy;
            p.rotation += p.rotSpeed;
            p.opacity -= p.decay;
            p.vx *= 0.99;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        frame++;
        if (alive && frame < 300) {
            requestAnimationFrame(animate);
        }
    }

    // Delay confetti slightly for dramatic effect
    setTimeout(() => animate(), 400);
}
