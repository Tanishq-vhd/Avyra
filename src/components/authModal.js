import { api, auth } from '../api.js';
import { showModal } from './modal.js';
import { showToast } from './toast.js';

// Google Client ID
const GOOGLE_CLIENT_ID = '489249008541-r922il9jpkh0ij29l51tkkjdmutp9a0b.apps.googleusercontent.com';

// Global Google callback — must be on window for GIS
window.__aviraGoogleCallback = null;

export function showAuthModal(mode = 'login') {
  let currentMode = mode;

  function renderForm() {
    const isLogin = currentMode === 'login';
    return `
      <div class="auth-form">
        <div id="auth-error" class="auth-form__error" style="display:none"></div>

        <!-- Google Sign-In — rendered by Google -->
        <div id="google-btn-container" style="display:flex;justify-content:center;min-height:44px"></div>

        <!-- Divider -->
        <div class="auth-divider">
          <span>or</span>
        </div>

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

  async function handleGoogleCredential(response) {
    const errorEl = modal.element.querySelector('#auth-error');
    try {
      errorEl.style.display = 'none';
      const result = await api.googleAuth(response.credential);
      auth.setUser(result.user, result.token);
      modal.close();
      showToast(`Welcome${result.user.name ? ', ' + result.user.name : ''}!`, 'success');

      if (!result.user.has_paid) {
        window.location.hash = '#/payment';
      }
    } catch (err) {
      errorEl.textContent = err.message || 'Google sign-in failed';
      errorEl.style.display = 'block';
    }
  }

  function renderGoogleButton() {
    const container = modal.element.querySelector('#google-btn-container');
    if (!container) return;

    // Wait for Google Identity Services to load
    if (typeof google === 'undefined' || !google.accounts) {
      container.innerHTML = '<button class="auth-google-btn" disabled style="opacity:0.6"><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg><span>Loading Google...</span></button>';
      // Retry after GIS loads
      setTimeout(() => renderGoogleButton(), 500);
      return;
    }

    // Set global callback
    window.__aviraGoogleCallback = handleGoogleCredential;

    // Initialize Google Identity Services
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (resp) => {
        if (window.__aviraGoogleCallback) {
          window.__aviraGoogleCallback(resp);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: false,
    });

    // Render official Google button
    google.accounts.id.renderButton(container, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: currentMode === 'login' ? 'signin_with' : 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'center',
      width: 380,
    });
  }

  function attachEvents() {
    const form = modal.element;

    // Render Google button
    renderGoogleButton();

    // Email/Password submit
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

    // Toggle login/register
    form.querySelector('#auth-toggle').addEventListener('click', () => {
      currentMode = currentMode === 'login' ? 'register' : 'login';
      form.querySelector('.modal__title').textContent = currentMode === 'login' ? 'Welcome back' : 'Create your account';
      form.querySelector('.modal__body').innerHTML = renderForm();
      attachEvents();
    });

    // Enter key
    form.querySelectorAll('.input').forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') form.querySelector('#auth-submit').click();
      });
    });
  }

  attachEvents();
  return modal;
}
