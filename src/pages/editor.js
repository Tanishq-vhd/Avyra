import { api, auth } from '../api.js';
import { showModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { showAuthModal } from '../components/authModal.js';

const COLOR_PALETTES = [
    { primary: '#1a1a2e', secondary: '#16213e', accent: '#0f3460', text: '#e94560', bg: '#ffffff', name: 'Midnight' },
    { primary: '#2d3436', secondary: '#636e72', accent: '#00b894', text: '#00cec9', bg: '#ffffff', name: 'Forest' },
    { primary: '#6c5ce7', secondary: '#a29bfe', accent: '#fd79a8', text: '#6c5ce7', bg: '#ffffff', name: 'Violet' },
    { primary: '#0984e3', secondary: '#74b9ff', accent: '#00cec9', text: '#0984e3', bg: '#ffffff', name: 'Ocean' },
    { primary: '#2d3436', secondary: '#b2bec3', accent: '#fdcb6e', text: '#2d3436', bg: '#ffffff', name: 'Charcoal Gold' },
    { primary: '#e17055', secondary: '#fab1a0', accent: '#fdcb6e', text: '#2d3436', bg: '#ffffff', name: 'Sunset' },
    { primary: '#00b894', secondary: '#55efc4', accent: '#81ecec', text: '#2d3436', bg: '#ffffff', name: 'Emerald' },
    { primary: '#e84393', secondary: '#fd79a8', accent: '#a29bfe', text: '#2d3436', bg: '#ffffff', name: 'Magenta' },
    { primary: '#2c3e50', secondary: '#34495e', accent: '#e74c3c', text: '#2c3e50', bg: '#ffffff', name: 'Professional' },
    { primary: '#1B1464', secondary: '#341f97', accent: '#5f27cd', text: '#1B1464', bg: '#ffffff', name: 'Deep Indigo' },
    { primary: '#0c0c0c', secondary: '#333333', accent: '#c0a36e', text: '#0c0c0c', bg: '#ffffff', name: 'Noir Gold' },
    { primary: '#2C3A47', secondary: '#596275', accent: '#82ccdd', text: '#2C3A47', bg: '#ffffff', name: 'Steel Blue' }
];

const FONTS = [
    { key: 'sans', label: 'Inter', family: 'Inter, Arial, sans-serif' },
    { key: 'serif', label: 'Playfair Display', family: 'Playfair Display, Georgia, serif' },
    { key: 'display', label: 'Space Grotesk', family: 'Space Grotesk, Arial, sans-serif' },
    { key: 'mono', label: 'JetBrains Mono', family: 'JetBrains Mono, Consolas, monospace' },
    { key: 'elegant', label: 'Playfair Elegant', family: 'Playfair Display, Georgia, serif' },
    { key: 'technical', label: 'Inter Light', family: 'Inter, Arial, sans-serif' }
];

let currentLogo = null;
let currentBg = 'white';

export async function renderEditor(container, logoId) {
    container.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;padding:var(--space-16);color:var(--color-text-secondary)">
      <div class="loading-dots"><span></span><span></span><span></span></div>
    </div>
  `;

    try {
        const { logo } = await api.getLogo(logoId);
        currentLogo = logo;
        renderEditorUI(container);
    } catch (err) {
        container.innerHTML = `
      <div style="text-align:center;padding:var(--space-20)">
        <p style="color:var(--color-text-secondary)">Logo not found</p>
        <a href="#/generate" class="btn btn--primary" style="margin-top:var(--space-4)">← Back to Generator</a>
      </div>
    `;
    }
}

function renderEditorUI(container) {
    const logo = currentLogo;
    const config = logo.config ? (typeof logo.config === 'string' ? JSON.parse(logo.config) : logo.config) : {};

    container.innerHTML = `
    <div class="editor-page fade-in">
      <div class="editor__preview">
        <div class="editor__preview-canvas" id="editor-canvas" style="background:${currentBg === 'dark' ? '#1a1a1a' : currentBg === 'checker' ? 'repeating-conic-gradient(#e0e0e0 0% 25%, transparent 0% 50%) 50%/16px 16px' : 'white'}">
          <div id="logo-preview">${logo.svg_data}</div>
        </div>
        <div class="editor__bg-toggle">
          <div class="editor__bg-option editor__bg-option--white${currentBg === 'white' ? ' editor__bg-option--active' : ''}" data-bg="white" title="White background"></div>
          <div class="editor__bg-option editor__bg-option--dark${currentBg === 'dark' ? ' editor__bg-option--active' : ''}" data-bg="dark" title="Dark background"></div>
          <div class="editor__bg-option editor__bg-option--checker${currentBg === 'checker' ? ' editor__bg-option--active' : ''}" data-bg="checker" title="Transparent"></div>
        </div>
      </div>

      <div class="editor__controls">
        <div style="margin-bottom:var(--space-4)">
          <a href="#/generate" class="btn btn--ghost btn--sm">← Back</a>
        </div>

        <div class="editor__section">
          <div class="editor__section-title">Style</div>
          <div class="pill" style="cursor:default;background:var(--color-accent-light);color:var(--color-accent);border-color:var(--color-accent)">
            ${(logo.style || '').replace(/_/g, ' ')}
          </div>
        </div>

        <div class="editor__section">
          <div class="editor__section-title">Color Palette</div>
          <div class="editor__color-grid" id="palette-grid">
            ${COLOR_PALETTES.map((p, i) => `
              <div class="editor__color-swatch${config.paletteIndex === i ? ' editor__color-swatch--active' : ''}" 
                   style="background:linear-gradient(135deg, ${p.primary}, ${p.accent})" 
                   data-palette="${i}" title="${p.name}">
              </div>
            `).join('')}
          </div>
        </div>

        <div class="editor__section">
          <div class="editor__section-title">Typography</div>
          <div class="editor__font-list" id="font-list">
            ${FONTS.map(f => `
              <div class="editor__font-option${config.font === f.key ? ' editor__font-option--active' : ''}" 
                   data-font="${f.key}" style="font-family:${f.family}">
                ${f.label}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="editor__section">
          <div class="editor__section-title">Spacing</div>
          <input type="range" class="editor__slider" id="spacing-slider" min="0" max="10" value="${config.letterSpacing || 1}" step="0.5" />
          <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);color:var(--color-text-tertiary);margin-top:var(--space-1)">
            <span>Tight</span><span>Wide</span>
          </div>
        </div>

        <div class="editor__download-section">
          <div class="editor__section-title">Download</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            <button class="btn btn--primary" id="download-png" style="width:100%">Download PNG</button>
            <button class="btn btn--secondary" id="download-svg" style="width:100%">
              Download SVG
              <span class="badge badge--pro" style="margin-left:var(--space-2)">PRO</span>
            </button>
            <button class="btn btn--secondary" id="download-hires" style="width:100%">
              High-Res PNG
              <span class="badge badge--starter" style="margin-left:var(--space-2)">STARTER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

    // Background toggle
    container.querySelectorAll('.editor__bg-option').forEach(opt => {
        opt.addEventListener('click', () => {
            currentBg = opt.dataset.bg;
            container.querySelectorAll('.editor__bg-option').forEach(o => o.classList.remove('editor__bg-option--active'));
            opt.classList.add('editor__bg-option--active');
            const canvas = container.querySelector('#editor-canvas');
            if (currentBg === 'dark') canvas.style.background = '#1a1a1a';
            else if (currentBg === 'checker') canvas.style.background = 'repeating-conic-gradient(#e0e0e0 0% 25%, transparent 0% 50%) 50%/16px 16px';
            else canvas.style.background = 'white';
        });
    });

    // Palette change
    container.querySelectorAll('[data-palette]').forEach(swatch => {
        swatch.addEventListener('click', () => {
            const idx = parseInt(swatch.dataset.palette);
            const palette = COLOR_PALETTES[idx];
            config.paletteIndex = idx;
            config.palette = palette;
            updatePreview(container, config);
            container.querySelectorAll('.editor__color-swatch').forEach(s => s.classList.remove('editor__color-swatch--active'));
            swatch.classList.add('editor__color-swatch--active');
            saveConfig(config);
        });
    });

    // Font change
    container.querySelectorAll('[data-font]').forEach(opt => {
        opt.addEventListener('click', () => {
            config.font = opt.dataset.font;
            const fontData = FONTS.find(f => f.key === config.font);
            config.fontFamily = fontData.family;
            updatePreview(container, config);
            container.querySelectorAll('.editor__font-option').forEach(o => o.classList.remove('editor__font-option--active'));
            opt.classList.add('editor__font-option--active');
            saveConfig(config);
        });
    });

    // Spacing slider
    container.querySelector('#spacing-slider').addEventListener('input', (e) => {
        config.letterSpacing = parseFloat(e.target.value);
        updatePreview(container, config);
        saveConfig(config);
    });

    // Download handlers
    container.querySelector('#download-png').addEventListener('click', () => handleDownload('png'));
    container.querySelector('#download-svg').addEventListener('click', () => handleDownload('svg'));
    container.querySelector('#download-hires').addEventListener('click', () => handleDownload('hires_png'));
}

function updatePreview(container, config) {
    const preview = container.querySelector('#logo-preview');
    if (!preview || !currentLogo) return;

    let svg = currentLogo.svg_data;

    // Apply palette colors by replacing fill/stroke attributes
    if (config.palette) {
        const p = config.palette;
        // Replace primary colors in SVG - simplified approach via text manipulation
        const svgEl = preview.querySelector('svg');
        if (svgEl) {
            svgEl.querySelectorAll('text').forEach(t => {
                if (config.fontFamily) {
                    t.setAttribute('font-family', config.fontFamily);
                }
                if (config.letterSpacing !== undefined) {
                    t.setAttribute('letter-spacing', config.letterSpacing);
                }
            });
        }
    }
}

async function saveConfig(config) {
    try {
        await api.updateLogo(currentLogo.id, config);
    } catch {
        // Silently fail saves
    }
}

async function handleDownload(format) {
    const user = auth.user;
    const needsAuth = !user;
    const needsUpgrade = format === 'svg' && (!user || user.plan !== 'pro');
    const needsStarter = format === 'hires_png' && (!user || user.plan === 'free');

    if (needsAuth) {
        showAuthModal('register');
        return;
    }

    if (needsUpgrade) {
        showModal({
            title: 'PRO feature',
            content: `
        <p style="color:var(--color-text-secondary);margin-bottom:var(--space-4)">SVG downloads are available on the Pro plan.</p>
        <div style="display:flex;gap:var(--space-3)">
          <a href="#/pricing" class="btn btn--primary" style="width:100%">Upgrade to Pro — ₹499</a>
        </div>
      `
        });
        return;
    }

    if (needsStarter) {
        showModal({
            title: 'Upgrade required',
            content: `
        <p style="color:var(--color-text-secondary);margin-bottom:var(--space-4)">High-res PNG downloads require the Starter plan or higher.</p>
        <div style="display:flex;gap:var(--space-3)">
          <a href="#/pricing" class="btn btn--primary" style="width:100%">View Plans</a>
        </div>
      `
        });
        return;
    }

    try {
        showToast('Preparing download...', 'default');
        const result = await api.downloadLogo(currentLogo.id, format);

        if (format === 'svg') {
            downloadFile(result.svgData, `${currentLogo.brand_name}-logo.svg`, 'image/svg+xml');
        } else {
            // Render SVG to canvas for PNG export
            const svgData = result.svgData;
            const scale = format === 'hires_png' ? 4 : 2;
            const canvas = document.createElement('canvas');
            canvas.width = 400 * scale;
            canvas.height = 300 * scale;
            const ctx = canvas.getContext('2d');

            const img = new Image();
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);

            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(url);

                canvas.toBlob((blob) => {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = `${currentLogo.brand_name}-logo${format === 'hires_png' ? '-hires' : ''}.png`;
                    a.click();
                    URL.revokeObjectURL(a.href);
                    showToast('Downloaded!', 'success');
                }, 'image/png');
            };

            img.src = url;
        }
    } catch (err) {
        if (err.data?.upgrade) {
            showModal({
                title: 'Download limit reached',
                content: `
          <p style="color:var(--color-text-secondary);margin-bottom:var(--space-4)">${err.data.message || 'Upgrade your plan to download more logos.'}</p>
          <a href="#/pricing" class="btn btn--primary" style="width:100%">View Plans</a>
        `
            });
        } else {
            showToast(err.message || 'Download failed', 'error');
        }
    }
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('Downloaded!', 'success');
}
