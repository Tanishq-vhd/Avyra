import { api, auth } from '../api.js';
import { showToast } from '../components/toast.js';

export function renderPayment(container) {
  const user = auth.user;

  container.innerHTML = `
  <div class="fade-in" style="max-width:460px;margin:0 auto;padding:var(--space-10) var(--space-6) var(--space-16)">
    <div style="text-align:center;margin-bottom:var(--space-6)">
      <div style="width:48px;height:48px;margin:0 auto var(--space-3)">
        <img src="/logo.png" alt="Avyra" style="width:100%;height:100%;object-fit:contain" />
      </div>
      <h1 style="font-size:var(--text-xl);font-weight:700;margin-bottom:var(--space-1)">
        Activate your account
      </h1>
      <p style="color:var(--color-text-secondary);font-size:var(--text-sm)">
        One-time payment of <strong style="color:var(--color-text)">₹199</strong> to unlock Avyra
      </p>
    </div>

    <div class="card card--elevated" style="padding:var(--space-5) var(--space-6)">
      <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:var(--space-3);margin-bottom:var(--space-3);border-bottom:1px solid var(--color-border)">
        <div>
          <div style="font-weight:600;font-size:var(--text-base)">Starter Plan</div>
          <div style="color:var(--color-text-tertiary);font-size:var(--text-xs)">Lifetime access</div>
        </div>
        <div style="font-size:var(--text-2xl);font-weight:700">₹199</div>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:var(--space-1) var(--space-4);margin-bottom:var(--space-4);font-size:var(--text-xs);color:var(--color-text-secondary)">
        <span>✓ Unlimited concepts</span>
        <span>✓ 3 PNG downloads</span>
        <span>✓ Full editor</span>
        <span>✓ Transparent BG</span>
        <span>✓ Commercial rights</span>
      </div>

      <div style="background:var(--color-surface, var(--color-bg-alt));border-radius:var(--radius-md);padding:var(--space-3);margin-bottom:var(--space-4);display:flex;align-items:center;gap:var(--space-3)">
        <div style="width:32px;height:32px;border-radius:50%;background:var(--color-accent);display:flex;align-items:center;justify-content:center;color:white;font-size:var(--text-xs);font-weight:600;flex-shrink:0">
          ${(user?.name || 'U')[0].toUpperCase()}
        </div>
        <div style="min-width:0">
          <div style="font-size:var(--text-sm);font-weight:500">${user?.name || 'User'}</div>
          <div style="font-size:var(--text-xs);color:var(--color-text-tertiary);overflow:hidden;text-overflow:ellipsis">${user?.email || ''}</div>
        </div>
      </div>

      <div style="margin-bottom:var(--space-3)">
        <div class="input-group" style="margin-bottom:var(--space-3)">
          <label style="font-size:var(--text-xs);font-weight:500">Card Number</label>
          <input type="text" class="input" id="card-number" placeholder="4242 4242 4242 4242" maxlength="19" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div class="input-group">
            <label style="font-size:var(--text-xs);font-weight:500">Expiry</label>
            <input type="text" class="input" id="card-expiry" placeholder="MM/YY" maxlength="5" />
          </div>
          <div class="input-group">
            <label style="font-size:var(--text-xs);font-weight:500">CVC</label>
            <input type="text" class="input" id="card-cvc" placeholder="123" maxlength="4" />
          </div>
        </div>
      </div>

      <button class="btn btn--primary btn--lg" id="pay-btn" style="width:100%">
        Pay ₹199 →
      </button>

      <div style="text-align:center;margin-top:var(--space-2);font-size:var(--text-xs);color:var(--color-text-tertiary)">
        Secure payment · One-time · No subscription
      </div>
    </div>
  </div>
  `;

  // Card number formatting
  const cardInput = container.querySelector('#card-number');
  cardInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\\D/g, '').slice(0, 16);
    e.target.value = v.replace(/(\\d{4})(?=\\d)/g, '$1 ');
  });

  // Expiry formatting
  const expiryInput = container.querySelector('#card-expiry');
  expiryInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    e.target.value = v;
  });

  // Pay button
  const payBtn = container.querySelector('#pay-btn');
  payBtn.addEventListener('click', async () => {
    const card = cardInput.value.replace(/\\s/g, '');
    const expiry = expiryInput.value;
    const cvc = container.querySelector('#card-cvc').value;

    if (!card || !expiry || !cvc) {
      showToast('Please fill in all card details', 'error');
      return;
    }

    payBtn.disabled = true;
    payBtn.innerHTML = '<span class="spinner"></span> Processing...';

    try {
      await new Promise(r => setTimeout(r, 1500));
      const result = await api.activatePayment();
      auth.setUser(result.user);
      showToast('Payment successful! Welcome to Avyra.', 'success');
      window.location.hash = '#/payment-success';
    } catch (err) {
      showToast(err.message || 'Payment failed', 'error');
      payBtn.disabled = false;
      payBtn.innerHTML = 'Pay ₹199 →';
    }
  });
}
