export function renderFooter(container) {
    container.innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <div class="footer__brand-name">Avira AI</div>
          <p class="footer__brand-desc">Create stunning, professional logos in seconds with the power of AI. Trusted by over 1M+ creators worldwide.</p>
          <div class="footer__socials">
            <a href="#" class="footer__social" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" class="footer__social" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="footer__social" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" class="footer__social" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        <div>
          <div class="footer__col-title">Product</div>
          <div class="footer__col-links">
            <a href="#/" class="footer__link">Home</a>
            <a href="#/generate" class="footer__link">Generate Logo</a>
            <a href="#/pricing" class="footer__link">Pricing</a>
            <a href="#/" class="footer__link">Gallery</a>
            <a href="#/" class="footer__link">Templates</a>
          </div>
        </div>

        <div>
          <div class="footer__col-title">Company</div>
          <div class="footer__col-links">
            <a href="#/" class="footer__link">About Us</a>
            <a href="#/" class="footer__link">Blog</a>
            <a href="#/" class="footer__link">Careers</a>
            <a href="#/" class="footer__link">Contact</a>
          </div>
        </div>

        <div>
          <div class="footer__col-title">Newsletter</div>
          <p class="footer__link" style="cursor:default;margin-bottom:var(--space-2)">Get tips on branding & design</p>
          <div class="footer__newsletter">
            <input type="email" class="footer__newsletter-input" placeholder="Enter your email" id="footer-newsletter-email" />
            <button class="footer__newsletter-btn" id="footer-newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__copy">© ${new Date().getFullYear()} Avira AI. All rights reserved.</div>
        <div class="footer__bottom-links">
          <a href="#/" class="footer__bottom-link">Privacy Policy</a>
          <a href="#/" class="footer__bottom-link">Terms of Service</a>
          <a href="#/" class="footer__bottom-link">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>`;
}
