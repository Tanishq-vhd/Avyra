import { api, auth } from '../api.js';
import { showModal } from './modal.js';
import { showToast } from './toast.js';

export function showAuthModal(mode = 'login') {
  let currentMode = mode;

  function renderForm() {
    const isLogin = currentMode === 'login';
    return `
      <div class="auth-form">
        <div id="auth-error" class="auth-form__error" style="display:none"></div>
        ${!isLogin ? `
          <div class="input-group">
            <label>Full Name</label>
            <input type="text" class="input" id="auth-name" placeholder="Jane Smith" autocomplete="name" />
          </div>
        ` : ''}
        <div class="input-group">
          <label>Email</label>
          <input type="email" class="input" id="auth-email" placeholder="you@example.com" autocomplete="email" />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input type="password" class="input" id="auth-password" placeholder="Min. 6 characters" autocomplete="${isLogin ? 'current-password' : 'new-password'}" />
        </div>
        <button class="btn btn--primary btn--lg" id="auth-submit" style="width:100%;margin-top:var(--space-2)">
          ${isLogin ? 'Sign In' : 'Create Account'}
        </button>
        <div class="auth-form__toggle">
          ${isLogin ? "Don't have an account?" : 'Already have an account?'}
          <a id="auth-toggle">${isLogin ? 'Sign up' : 'Sign in'}</a>
        </div>
      </div>
    `;
  }

  const modal = showModal({
    title: currentMode === 'login' ? 'Welcome back' : 'Create your account',
    content: renderForm()
  });

  function attachEvents() {
    const form = modal.element;

    form.querySelector('#auth-submit').addEventListener('click', async () => {
      const email = form.querySelector('#auth-email').value;
      const password = form.querySelector('#auth-password').value;
      const errorEl = form.querySelector('#auth-error');

      try {
        errorEl.style.display = 'none';
        const submitBtn = form.querySelector('#auth-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>';

        let result;
        if (currentMode === 'login') {
          result = await api.login(email, password);
        } else {
          const name = form.querySelector('#auth-name').value;
          result = await api.register(email, password, name);
        }

        auth.setUser(result.user, result.token);
        modal.close();
        showToast(`Welcome${result.user.name ? ', ' + result.user.name : ''}!`, 'success');

        // Redirect to payment if user hasn't paid yet
        if (!result.user.has_paid) {
          window.location.hash = '#/payment';
        }
      } catch (err) {
        errorEl.textContent = err.message || 'Something went wrong';
        errorEl.style.display = 'block';
        const submitBtn = form.querySelector('#auth-submit');
        submitBtn.disabled = false;
        submitBtn.textContent = currentMode === 'login' ? 'Sign In' : 'Create Account';
      }
    });

    form.querySelector('#auth-toggle').addEventListener('click', () => {
      currentMode = currentMode === 'login' ? 'register' : 'login';
      form.querySelector('.modal__title').textContent = currentMode === 'login' ? 'Welcome back' : 'Create your account';
      form.querySelector('.modal__body').innerHTML = renderForm();
      attachEvents();
    });

    // Enter key submit
    form.querySelectorAll('.input').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') form.querySelector('#auth-submit').click();
      });
    });
  }

  attachEvents();
  return modal;
}
