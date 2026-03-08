export function renderFooter(container) {
    container.innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__brand">Avira</div>
        <div class="footer__links">
          <a href="#/" class="footer__link">Home</a>
          <a href="#/generate" class="footer__link">Generate</a>
          <a href="#/pricing" class="footer__link">Pricing</a>
        </div>
        <div class="footer__copy">© ${new Date().getFullYear()} Avira. All rights reserved.</div>
      </div>
    </div>
  </footer>`;
}
