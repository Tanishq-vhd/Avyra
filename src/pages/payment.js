import { api, auth } from '../api.js';
import { showToast } from '../components/toast.js';

export function renderPayment(container) {
  const user = auth.user;

  container.innerHTML = `
  <div class="fade-in" style="max-width:460px;margin:0 auto;padding:var(--space-10) var(--space-6) var(--space-16)">
    <div style="text-align:center;margin-bottom:var(--space-6)">
      <div style="width:48px;height:48px;margin:0 auto var(--space-3)">
        <img src="/logo.png" alt="Avira" style="width:100%;height:100%;object-fit:contain" />
      </div>
      <h1 style="font-size:var(--text-xl);font-weight:700;margin-bottom:var(--space-1)">
        Activate your account
      </h1>
      <p style="color:var(--color-text-secondary);font-size:var(--text-sm)">
        One-time payment of <strong style="color:var(--color-text)">₹199</strong> to unlock Avira
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

      <button class="btn btn--primary btn--lg" id="pay-btn" style="width:100%">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:6px"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        Pay ₹199 securely
      </button>

      <div style="text-align:center;margin-top:var(--space-3);display:flex;align-items:center;justify-content:center;gap:var(--space-2)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-text-tertiary)"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        <span style="font-size:var(--text-xs);color:var(--color-text-tertiary)">Secured by Razorpay · 256-bit encryption</span>
      </div>
    </div>
  </div>
  `;

  // Pay button — opens Razorpay checkout
  const payBtn = container.querySelector('#pay-btn');
  payBtn.addEventListener('click', async () => {
    payBtn.disabled = true;
    payBtn.innerHTML = '<span class="spinner"></span> Loading...';

    try {
      // 1. Get Razorpay key from server
      const { key } = await api.getRazorpayKey();

      // 2. Create order on server
      const order = await api.createOrder('starter');

      // 3. Open Razorpay checkout
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: 'Avira',
        description: 'Starter Plan — Lifetime Access',
        image: '/logo.png',
        order_id: order.orderId,
        prefill: {
          name: user?.name || '',
          email: user?.email || ''
        },
        theme: {
          color: '#7c3aed'
        },
        handler: async function (response) {
          // 4. Verify payment on server
          payBtn.innerHTML = '<span class="spinner"></span> Verifying...';
          try {
            const result = await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: 'starter'
            });
            auth.setUser(result.user);
            showToast('Payment successful! Welcome to Avira.', 'success');
            window.location.hash = '#/payment-success';
          } catch (err) {
            showToast(err.message || 'Payment verification failed', 'error');
            payBtn.disabled = false;
            payBtn.innerHTML = 'Pay ₹199 securely';
          }
        },
        modal: {
          ondismiss: function () {
            payBtn.disabled = false;
            payBtn.innerHTML = 'Pay ₹199 securely';
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        showToast(response.error.description || 'Payment failed', 'error');
        payBtn.disabled = false;
        payBtn.innerHTML = 'Pay ₹199 securely';
      });
      rzp.open();

    } catch (err) {
      showToast(err.message || 'Failed to initiate payment', 'error');
      payBtn.disabled = false;
      payBtn.innerHTML = 'Pay ₹199 securely';
    }
  });
}
