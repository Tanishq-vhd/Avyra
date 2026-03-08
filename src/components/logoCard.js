export function renderLogoCard(logo, { onSelect, onRemix, onDownload }) {
    const card = document.createElement('div');
    card.className = 'logo-card';
    card.setAttribute('data-logo-id', logo.id);

    const styleLabel = (logo.style || '').replace(/_/g, ' ');

    card.innerHTML = `
    <div class="logo-card__preview">
      ${logo.svgData || logo.svg_data || ''}
      <div class="watermark">AVIRA</div>
    </div>
    <div class="logo-card__info">
      <span class="logo-card__style">${styleLabel}</span>
      <div class="logo-card__actions">
        <button class="btn btn--ghost btn--sm logo-action" data-action="remix" title="Remix">↻</button>
        <button class="btn btn--ghost btn--sm logo-action" data-action="download" title="Quick Download">↓</button>
        <button class="btn btn--primary btn--sm logo-action" data-action="select">Select</button>
      </div>
    </div>
  `;

    // Clicking the card itself selects
    card.querySelector('.logo-card__preview').addEventListener('click', () => onSelect?.(logo));

    card.querySelectorAll('.logo-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            if (action === 'select') onSelect?.(logo);
            if (action === 'remix') onRemix?.(logo);
            if (action === 'download') onDownload?.(logo);
        });
    });

    return card;
}
