import { api } from '../api.js';
import { renderFilterBar } from '../components/filterBar.js';
import { renderLogoCard } from '../components/logoCard.js';
import { showToast } from '../components/toast.js';

let currentLogos = [];
let currentFilter = 'all';
let currentSessionId = null;

export function renderGenerate(container) {
    container.innerHTML = `
  <div class="generate-page">
    <div class="container">
      <div class="generate-page__header slide-up">
        <h1 class="generate-page__title">Create your logo</h1>
        <p class="generate-page__desc">Enter your brand details and AI will generate unique logo concepts instantly.</p>
      </div>

      <form class="generate-form card card--elevated slide-up" id="generate-form" style="animation-delay:100ms">
        <div class="generate-form__fields">
          <div class="input-group">
            <label for="brand-name">Brand Name *</label>
            <input type="text" class="input input--lg" id="brand-name" placeholder="e.g. Zenith" required maxlength="100" />
          </div>
          <div class="input-group">
            <label for="brand-desc">Description</label>
            <textarea class="input" id="brand-desc" placeholder="Describe your brand in a few words — e.g. 'Fintech startup helping small businesses manage payments'" maxlength="500"></textarea>
          </div>
          <div class="input-group">
            <label for="brand-industry">Industry</label>
            <select class="input select" id="brand-industry">
              <option value="">Select industry</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Fashion">Fashion</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Consulting">Consulting</option>
              <option value="Marketing">Marketing</option>
              <option value="Sports">Sports</option>
              <option value="Automotive">Automotive</option>
              <option value="Non-profit">Non-profit</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="input-group">
            <label for="brand-tagline">Tagline <span style="color:var(--color-text-tertiary);font-weight:400">(optional)</span></label>
            <input type="text" class="input" id="brand-tagline" placeholder="e.g. 'Build Better'" maxlength="200" />
          </div>
        </div>
        <div class="generate-form__submit">
          <button type="submit" class="btn btn--primary btn--lg" id="generate-btn" style="min-width:200px">
            Generate Logos ✨
          </button>
        </div>
      </form>

      <div id="results-section" style="display:none">
        <div class="divider"></div>
        <div class="results">
          <div class="results__header">
            <div>
              <span class="results__count"><strong id="results-count">0</strong> logos generated</span>
            </div>
            <div id="filter-container"></div>
            <button class="btn btn--secondary btn--sm" id="regenerate-btn">↻ Regenerate</button>
          </div>
          <div class="logo-grid stagger" id="logo-grid"></div>
        </div>
      </div>

      <div id="loading-section" style="display:none">
        <div class="divider"></div>
        <div style="text-align:center;padding:var(--space-16) 0">
          <div class="loading-dots"><span></span><span></span><span></span></div>
          <p style="margin-top:var(--space-4);color:var(--color-text-secondary);font-size:var(--text-sm)">
            Crafting unique logo concepts for your brand...
          </p>
        </div>
      </div>
    </div>
  </div>
  `;

    const form = container.querySelector('#generate-form');
    const generateBtn = container.querySelector('#generate-btn');
    const resultsSection = container.querySelector('#results-section');
    const loadingSection = container.querySelector('#loading-section');
    const logoGrid = container.querySelector('#logo-grid');
    const filterContainer = container.querySelector('#filter-container');
    const resultsCount = container.querySelector('#results-count');
    const regenerateBtn = container.querySelector('#regenerate-btn');

    async function handleGenerate(e) {
        if (e) e.preventDefault();
        const brandName = container.querySelector('#brand-name').value.trim();
        if (!brandName) {
            showToast('Please enter a brand name', 'error');
            return;
        }

        const description = container.querySelector('#brand-desc').value.trim();
        const industry = container.querySelector('#brand-industry').value;
        const tagline = container.querySelector('#brand-tagline').value.trim();

        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span class="spinner"></span> Generating...';
        resultsSection.style.display = 'none';
        loadingSection.style.display = 'block';

        try {
            const result = await api.generateLogos(brandName, description, industry, tagline);
            currentLogos = result.logos;
            currentSessionId = result.sessionId;
            currentFilter = 'all';
            renderResults();
            showToast(`${result.logos.length} logos generated!`, 'success');
        } catch (err) {
            showToast(err.message || 'Generation failed', 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = 'Generate Logos ✨';
            loadingSection.style.display = 'none';
        }
    }

    function renderResults() {
        resultsSection.style.display = 'block';
        const filteredLogos = currentFilter === 'all'
            ? currentLogos
            : currentLogos.filter(l => l.style === currentFilter);

        resultsCount.textContent = filteredLogos.length;

        renderFilterBar(filterContainer, currentFilter, (filter) => {
            currentFilter = filter;
            renderResults();
        });

        logoGrid.innerHTML = '';
        filteredLogos.forEach(logo => {
            const card = renderLogoCard(logo, {
                onSelect: (l) => {
                    window.location.hash = `#/editor/${l.id}`;
                },
                onRemix: async (l) => {
                    try {
                        showToast('Remixing...', 'default');
                        const brandName = container.querySelector('#brand-name').value.trim();
                        const result = await api.generateLogos(
                            brandName,
                            container.querySelector('#brand-desc').value.trim(),
                            container.querySelector('#brand-industry').value,
                            container.querySelector('#brand-tagline').value.trim()
                        );
                        currentLogos = result.logos;
                        renderResults();
                        showToast('New variations generated!', 'success');
                    } catch (err) {
                        showToast('Remix failed', 'error');
                    }
                },
                onDownload: (l) => {
                    window.location.hash = `#/editor/${l.id}`;
                }
            });
            logoGrid.appendChild(card);
        });
    }

    form.addEventListener('submit', handleGenerate);
    regenerateBtn.addEventListener('click', handleGenerate);
}
